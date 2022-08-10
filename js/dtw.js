// Calculate the DTW path for 2D time series X, Y
let dtw = async (X, Y) => {
    let n = X[0].length;
    let m = Y[0].length;
    
    // Local weights for the accumulated cost matrix D
    let w = {d: 2, h: 1.5, v: 1.5};
    console.log ("Local weights w: ", w)
    
    // Get a global constrain region R, that encodes what portion of the
    // cost matrix C will be calculated going forward. wsz = WindowSize
    // This speeds up the computation, but comes at the risk of inaccuracy.
    // MsDTW and MrMsDTW would be further advanced optimizations.
    let R = await computeGlobalConstraintRegion(n, m, 0.8);
    //console.log("Constraint region R:\n", R);
    
    let C = await costMatrix(math.transpose(X), math.transpose(Y), R);
    let D = await computeAccumulatedCostMatrix(C, R, w);
    let P = await computeOptimalWarpingPath(D);

    console.log("-DTW distance DTW(X,Y) = ", D.at(-1).at(-1));

    C, R = null;

    return [P, D];
}

// Distance matrix between any 2 given 2D vectors that have the same number of rows
// Metric: Cosine distance
// Cost matrix C
let costMatrix = async (N, M, R) => {
    console.log("Step: Cost matrix");
    let n = N.length;
    let m = M.length;

    let cosD = arrayFilled(n, m, Infinity);

    for(let i = 0; i < n; i++) {
        // Set boundary conditions from said constraint region R = Sakoe-Chiba band
        for(let k = R[0][i], len = R[1][i]; k < len; k++) {
            let ni = N[i];
            let mk = M[k];
            cosD[i][k] = 1 - (math.dot(ni, mk) / (math.norm(ni, 2) * math.norm(mk, 2)));
        }
    }
    return cosD;
}

// Accumulated cost matrix D
let computeAccumulatedCostMatrix = async (C, R, w) => {
    console.log("Step: Accumulated cost matrix");
    let n = C.length;

    // Use constraint region R to determine which parts of the calculation can be left out
    // R[0].findIndex(e => e > 0): First starting index R[0][i] where it doesn't touch the border of the matrix anymore
    for(let i = 1, len = R[0].findIndex(e => e > 0); i < len; i++) {
        C[i][0] = C[i-1][0] + ( C[i][0] * w['h'] );
    }   

    for(let j = 1, len = R[1][0]; j < len; j++) {
        C[0][j] = C[0][j-1] + ( C[0][j] * w['v'] );
    }

    // Fill rest of the matrix w.r.t. R
    for(let i = 1; i < n; i++) {
        for(let k = 1, len = R[1][i]; k < len; k++) {
            let C_ik = C[i][k];
            C[i][k] = Math.min( C[i-1][k] + ( w['h'] * C_ik ), 
                                C[i][k-1] + ( w['v'] * C_ik ), 
                                C[i-1][k-1] + ( w['d'] * C_ik ) );
            /* console.log("D[",i,"][",k,"]: ", D[i][k], " = \nMath.min(\nC[",i-1,"][",k,"]: ", C[i-1][k], " + C[",i,"][",k,"]: ", C[i][k], "\n( = ",C[i-1][k]+C[i][k],"),\nC[",i,"][",k-1,"]: ", C[i][k-1], " + C[",i,"][",k,"]: ", C[i][k], "\n( = ",C[i][k-1]+C[i][k],"),\nC[",i-1,"][",k-1,"]: ", C[i-1][k-1], " + C[",i,"][",k,"]: ", C[i][k], "\n( = ",C[i-1][k-1]+C[i][k],") \n)") */
        }            
    }
    return C;
}

// Optimal warping path P from an accumulated cost matrix D
let computeOptimalWarpingPath = async (D) => {
    console.log("Step: Optimal warping path");
    const N = D.length;
    const M = D[0].length;

    let n = N-1;
    let m = M-1;
    let P = [[n, m]];
    let cell;

    while(n > 0 || m > 0) {
        if (n == 0) {
            cell = [0, m-1];
        } else if (m == 0) {
            cell = [n-1, 0];
        } else {
            let d_n1m1 = D[n-1][m-1];
            let d_n1m = D[n-1][m];
            let val = Math.min( d_n1m1, 
                                d_n1m, 
                                D[n][m-1] );
            if (val == d_n1m1) {
                cell = [n-1, m-1];
            } else if (val == d_n1m) {
                cell = [n-1, m];
            } else {
                cell = [n, m-1];
            }
        }
        P.push(cell);
        n = cell[0];
        m = cell[1];
    }

    P.reverse();
    return P;
}
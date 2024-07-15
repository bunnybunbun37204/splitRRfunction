// TODO: Implement function

/**
 * Splits RR based on input data.
 *
 * @param {Array} data - The array of product data to split.
 * @returns {Object} The split RR data.
 */
function splitRR(data) {
    const RR_split = {};

    data.forEach(product => {
        const arr_rr = product.rr_csv.split(",");
        const arr_rr_in = product.rr_csv_q.split(",").map(Number);
        let ird_out = parseInt(product.stock_out);

        if (arr_rr.length !== arr_rr_in.length) {
            console.log(product.product_no, 'has a problem');
            return;
        }

        for (let i = 0; i < arr_rr.length; i++) {
            if (["3RR-00012", "3RR-00043", "3RR-00003", "3RR-00077", "3RR-00078", "3RR-00079"].includes(arr_rr[i])) {
                break;
            }

            if (ird_out < arr_rr_in[i]) {
                if (ird_out !== 0) {
                    if (!RR_split[arr_rr[i]]) {
                        RR_split[arr_rr[i]] = [];
                    }
                    RR_split[arr_rr[i]].push({
                        'rr_no': arr_rr[i],
                        'q_out': ird_out,
                        'q_remain': arr_rr_in[i] - ird_out,
                        'product_no': product.product_no
                    });
                }
                break;
            }

            if (ird_out === arr_rr_in[i]) {
                break;
            }

            ird_out -= arr_rr_in[i];
        }
    });

    return RR_split;
}

module.exports = splitRR;
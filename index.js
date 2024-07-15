// TODO: Implement function

/**
 * Processes the IRDRRstock array and splits the RR based on stock quantities.
 *
 * @param {Array} IRDRRstock - The array of products with RR and stock information.
 * @returns {Object} - The RR split object containing RR numbers and their corresponding quantities.
 */
function splitRR(IRDRRstock) {
  let RR_split = {};

  IRDRRstock.forEach((product) => {
    let arr_rr = product.rr_csv.split(",");
    let arr_rr_in = product.rr_csv_q.split(",").map(Number);
    let ird_out = parseInt(product.stock_out);

    if (arr_rr.length !== arr_rr_in.length) {
      console.log(product.product_no, "has a problem");
    }
    console.log("RR equal", arr_rr.length === arr_rr_in.length);

    for (let i = 0; i < arr_rr.length; i++) {
      console.log("IRD OUT " + ird_out + " RR IN " + arr_rr_in[i]);

      if (
        [
          "3RR-00012",
          "3RR-00043",
          "3RR-00003",
          "3RR-00077",
          "3RR-00078",
          "3RR-00079",
        ].includes(arr_rr[i])
      )
        break;

      if (ird_out < arr_rr_in[i]) {
        // stock out น้อยกว่า rr in
        if (ird_out !== 0) {
          if (arr_rr[i] in RR_split) {
            RR_split[arr_rr[i]].push({
              rr_no: arr_rr[i],
              q_out: ird_out,
              q_remain: arr_rr_in[i] - ird_out,
              product_no: product.product_no,
            });
          } else {
            RR_split[arr_rr[i]] = [
              {
                rr_no: arr_rr[i],
                q_out: ird_out,
                q_remain: arr_rr_in[i] - ird_out,
                product_no: product.product_no,
              },
            ];
          }
        }
        break;
      }
      if (ird_out === arr_rr_in[i]) {
        break; // stock พอดี
      }

      ird_out -= arr_rr_in[i]; // check stock ใบ rr อันต่อไป
    }
  });

  const count = Object.keys(RR_split).length;
  console.log("Split RR", RR_split);
  console.log("Length", count);

  return RR_split;
}

module.exports = splitRR;

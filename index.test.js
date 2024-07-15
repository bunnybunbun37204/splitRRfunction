const splitRR = require('./index');

/**
 * Mock data for testing.
 */
const mockData = [
    {
        rr_csv: "3RR-00001,3RR-00002,3RR-00003",
        rr_csv_q: "10,20,30",
        stock_out: "25",
        product_no: "P001"
    },
    {
        rr_csv: "3RR-00004,3RR-00005,3RR-00006",
        rr_csv_q: "15,15,15",
        stock_out: "30",
        product_no: "P002"
    }
];

/**
 * Mock data with more complex cases.
 */
const complexMockData = [
    {
        rr_csv: "3RR-00001,3RR-00002,3RR-00003",
        rr_csv_q: "10,5,15",
        stock_out: "20",
        product_no: "P003"
    },
    {
        rr_csv: "3RR-00004,3RR-00005",
        rr_csv_q: "20,10",
        stock_out: "25",
        product_no: "P004"
    }
];

test('splits RR correctly for simple mock data', () => {
    const expected = {
        "3RR-00001": [{
            rr_no: "3RR-00001",
            q_out: 10,
            q_remain: 0,
            product_no: "P001"
        }],
        "3RR-00002": [{
            rr_no: "3RR-00002",
            q_out: 15,
            q_remain: 5,
            product_no: "P001"
        }],
        "3RR-00004": [{
            rr_no: "3RR-00004",
            q_out: 15,
            q_remain: 0,
            product_no: "P002"
        }],
        "3RR-00005": [{
            rr_no: "3RR-00005",
            q_out: 15,
            q_remain: 0,
            product_no: "P002"
        }]
    };

    expect(splitRR(mockData)).toEqual(expected);
});

test('splits RR correctly for complex mock data', () => {
    const expected = {
        "3RR-00001": [{
            rr_no: "3RR-00001",
            q_out: 10,
            q_remain: 0,
            product_no: "P003"
        }],
        "3RR-00002": [{
            rr_no: "3RR-00002",
            q_out: 5,
            q_remain: 0,
            product_no: "P003"
        }],
        "3RR-00003": [{
            rr_no: "3RR-00003",
            q_out: 5,
            q_remain: 10,
            product_no: "P003"
        }],
        "3RR-00004": [{
            rr_no: "3RR-00004",
            q_out: 20,
            q_remain: 0,
            product_no: "P004"
        }],
        "3RR-00005": [{
            rr_no: "3RR-00005",
            q_out: 5,
            q_remain: 5,
            product_no: "P004"
        }]
    };

    expect(splitRR(complexMockData)).toEqual(expected);
});

test('handles empty input', () => {
    expect(splitRR([])).toEqual({});
});

test('handles single product input', () => {
    const singleProduct = [
        {
            rr_csv: "3RR-00001",
            rr_csv_q: "10",
            stock_out: "5",
            product_no: "P005"
        }
    ];

    const expected = {
        "3RR-00001": [{
            rr_no: "3RR-00001",
            q_out: 5,
            q_remain: 5,
            product_no: "P005"
        }]
    };

    expect(splitRR(singleProduct)).toEqual(expected);
});

test('handles no stock out scenario', () => {
    const noStockOutData = [
        {
            rr_csv: "3RR-00001,3RR-00002",
            rr_csv_q: "10,20",
            stock_out: "0",
            product_no: "P006"
        }
    ];

    expect(splitRR(noStockOutData)).toEqual({});
});

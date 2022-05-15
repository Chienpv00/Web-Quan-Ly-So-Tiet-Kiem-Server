const calInterest = require('../src/middleware/tinhTienLai');
const tinhNgayChenhLech = require('../src/middleware/tinhChenhLechNgay');

// it('test tinh tien lai', () => {
//     expect(calInterest('LTK1', 10000000, '2022/05/05', null));
// });

it('test', () => {
    expect(tinhNgayChenhLech('2022/05/05'))
});

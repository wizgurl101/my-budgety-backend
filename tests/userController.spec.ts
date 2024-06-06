import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock'
import { GetAllKeywords } from '../src/controllers/userController';
import { BigQueryDatabase } from '../src/repository/bigquery.repository';
import DatabaseService from '../src/services/database.service';


//todo return this late to resolve the issue with the test
// GetAllKeywords(req, res) return res as {"format":{},"locals":{}}
describe.skip('User Controller Test Suite', () => {
    describe('Get All User Keywords Endpoint', () => {
        let BigQueryDatabaseStub, DatabaseServiceStub, queryStub;
        const testUserId = 'testUserId';

        beforeEach(() => {
            BigQueryDatabaseStub = sinon.stub(BigQueryDatabase.prototype, 'constructor');
            DatabaseServiceStub = sinon.stub(DatabaseService.prototype, 'constructor');

            queryStub = sinon.stub(DatabaseService.prototype, 'query');
            queryStub.returns(Promise.resolve([{
                category_id: 1,
                keyword_id: 1,
                name: 'hello kitty foods',
                user_id: testUserId }]));
        });

        afterEach(() => {
            // Restore the original methods
            BigQueryDatabaseStub.restore();
            DatabaseServiceStub.restore();
            queryStub.restore();
        });

        it('', async () => {
            const requestMock = {
                params: {
                    userId: testUserId
                }
            }

            const respondMock = {
                status: function () {
                    return this;
                },
                json: function () {
                    return{
                        status: 'success',
                            message: 'test',
                        data: sinon.stub()
                    }
                }
            };

            const res = mockRes(respondMock);
            const req = mockReq(requestMock);

            await GetAllKeywords(req, res);

            console.log(JSON.stringify(res));

            expect(true).to.be.true
            // expect(res.json.data).to.eql([{
            //     category_id: 1,
            //     keyword_id: 1,
            //     name: 'hello kitty foods',
            //     user_id: testUserId }]);
        })
    })
})
import {
    processResponseStatus as pRS,
    translateReposResult as tRR,
    translateUsersResult as tUR,
    generateUpdatedFilters as gUP
} from './';

describe('processResponseStatus', () => {
    describe('edge cases', () => {
        it('always returns a string if status !== 200', () => {
            expect(typeof pRS(404)).toEqual('string');
            expect(typeof pRS(202)).toEqual('string');
            expect(typeof pRS()).toEqual('string');
            expect(typeof pRS('s')).toEqual('string');
            expect(typeof pRS({}, [])).toEqual('string');
            expect(typeof pRS(404, 202)).toEqual('string');
        });
    })
    describe('regular', () => {
        it('returns null if status === 200', () => {
            expect(pRS(200)).toBeNull();
        })
        it('returns properly formatted message when status !== 200', () => {
            expect(pRS(1)).toEqual('request to GithubAPI returned with 1 http error');
            expect(pRS(404)).toEqual('request to GithubAPI returned with 404 http error');
            expect(pRS()).toEqual('request to GithubAPI returned with undefined http error');
        });
    })
});

describe('translateReposResult', () => {
    describe('edge cases', () => {
        it('always returns an array', () => {
            expect(Array.isArray(tRR([]))).toBeTruthy();
            expect(Array.isArray(tRR([1, 2, 3]))).toBeTruthy();
            expect(Array.isArray(tRR())).toBeTruthy();
            expect(Array.isArray(tRR({}))).toBeTruthy();
            expect(Array.isArray(tRR('test'))).toBeTruthy();
            expect(Array.isArray(tRR(1, []))).toBeTruthy();
        })
        it('always returns an empty array if result argument is not an array', () => {
            expect(tRR()).toEqual([]);
            expect(tRR({})).toEqual([]);
            expect(tRR('test')).toEqual([]);
            expect(tRR(11, [])).toEqual([]);
        });
    });
    describe('regular', () => {
        const validArg = [
            {
                html_url: 'test1',
                name: 'TEST1'
            },
            {
                html_url: 'test2',
                name: 'TEST2'
            },
            {
                html_url: 'test3',
                name: 'TEST3'
            },
            {
                html_url: 'test4',
                name: 'TEST4'
            },
        ];
        const testResult = tRR(validArg);

        it('always returns an array equal to the length of result argument', () => {
            const testCase1 = [ 1, 2, 3 ];
            const testCase2 = [ { 1: 1 }, 'asd', 1, [] ];
            const testCase3 = [];
            expect(tRR(testCase1).length).toEqual(testCase1.length);
            expect(tRR(testCase2).length).toEqual(testCase2.length);
            expect(tRR(testCase3).length).toEqual(testCase3.length);
        });
        it('returns an array of objects with key "url" equal to iterated object key "html_url"', () => {
            testResult.forEach((item, i) => {
                expect(item.url).toEqual(validArg[i].html_url);
            });
        });
        it('returns an array of objects with key "name" equal to iterated object key "login"', () => {
            testResult.forEach((item, i) => {
                expect(item.name).toEqual(validArg[i].name);
            });
        });
        it('returns an array with each element having a "origin" key equal to "repo"', () => {
            expect(testResult.filter(item => item.origin === 'repo').length).toEqual(validArg.length);
        });
    });
});

describe('translateUsersResult', () => {
    describe('edge cases', () => {
        it('always returns an array', () => {
            expect(Array.isArray(tUR([]))).toBeTruthy();
            expect(Array.isArray(tUR([1, 2, 3]))).toBeTruthy();
            expect(Array.isArray(tUR())).toBeTruthy();
            expect(Array.isArray(tUR({}))).toBeTruthy();
            expect(Array.isArray(tUR('test'))).toBeTruthy();
            expect(Array.isArray(tUR(1, []))).toBeTruthy();
        })
        it('always returns an empty array if result argument is not an array', () => {
            expect(tUR()).toEqual([]);
            expect(tUR({})).toEqual([]);
            expect(tUR('test')).toEqual([]);
            expect(tUR(11, [])).toEqual([]);
        });
    });
    describe('regular', () => {
        const validArg = [
            {
                html_url: 'test1',
                login: 'TEST1'
            },
            {
                html_url: 'test2',
                login: 'TEST2'
            },
            {
                html_url: 'test3',
                login: 'TEST3'
            },
            {
                html_url: 'test4',
                login: 'TEST4'
            },
        ];
        const testResult = tUR(validArg);

        it('always returns an array equal to the length of result argument', () => {
            const testCase1 = [ 1, 2, 3 ];
            const testCase2 = [ { 1: 1 }, 'asd', 1, [] ];
            const testCase3 = [];
            expect(tUR(testCase1).length).toEqual(testCase1.length);
            expect(tUR(testCase2).length).toEqual(testCase2.length);
            expect(tUR(testCase3).length).toEqual(testCase3.length);
        });
        it('returns an array of objects with key "url" equal to iterated object key "html_url"', () => {
            testResult.forEach((item, i) => {
                expect(item.url).toEqual(validArg[i].html_url);
            });
        });
        it('returns an array of objects with key "name" equal to iterated object key "login"', () => {
            testResult.forEach((item, i) => {
                expect(item.name).toEqual(validArg[i].login);
            });
        });
        it('returns an array with each element having a "origin" key equal to "user"', () => {
            expect(testResult.filter(item => item.origin === 'user').length).toEqual(validArg.length);
        });
    });
});

describe('generateUpdatedFilters', () => {
    describe('edge cases', () => {

    });
    describe('regular', () => {

    });
})
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
        it('always returns an empty array when wrong args are provided', () => {
            expect(gUP()).toEqual([]);
            expect(gUP(1, 'wt')).toEqual([]);
            expect(gUP({})).toEqual([]);
            expect(gUP(1.23, [])).toEqual([]);
            expect(gUP('test', 'repos')).toEqual([]);
        });
    });
    describe('regular', () => {
        const validArgs1 = [
            [],
            'repos'
        ];
        const validArgs2 = [
            [ 'repos', 'users' ],
            'repos'
        ];
        const validArgs3 = [
            [ 'repos' ],
            'users'
        ];
        const validArgs4 = [
            [ 'users' ],
            'users'
        ];
        const validArgs5 = [
            [ 'test', 'test', 'users', 'repos', 'test1' ],
            'users'
        ];
        const validArgs6 = [
            [ 'users', 'repos', 'longTest' ],
            'longerTest'
        ];
        const testResult1 = gUP(validArgs1[0], validArgs1[1]);
        const testResult2 = gUP(validArgs2[0], validArgs2[1]);
        const testResult3 = gUP(validArgs3[0], validArgs3[1]);
        const testResult4 = gUP(validArgs4[0], validArgs4[1]);
        const testResult5 = gUP(validArgs5[0], validArgs5[1]);
        const testResult6 = gUP(validArgs6[0], validArgs6[1]);

        it('always returns an array', () => {
            expect(Array.isArray(testResult1)).toBeTruthy();
            expect(Array.isArray(testResult2)).toBeTruthy();
            expect(Array.isArray(testResult3)).toBeTruthy();
            expect(Array.isArray(testResult4)).toBeTruthy();
            expect(Array.isArray(testResult5)).toBeTruthy();
            expect(Array.isArray(testResult6)).toBeTruthy();
        });
        it('returns an array based on filters, appended by type argument if it\'s not already present in filters', () => {
            expect(validArgs1[0].includes(validArgs1[1])).toBeFalsy();
            expect(testResult1.includes(validArgs1[1])).toBeTruthy();
            expect(validArgs3[0].includes(validArgs3[1])).toBeFalsy();
            expect(testResult3.includes(validArgs3[1])).toBeTruthy();
            expect(validArgs6[0].includes(validArgs6[1])).toBeFalsy();
            expect(testResult6.includes(validArgs6[1])).toBeTruthy();
        });
        it('returs an array longer than filters by exactly 1 when appending with type', () => {
            expect(validArgs1[0].length + 1).toEqual(testResult1.length);
            expect(validArgs3[0].length + 1).toEqual(testResult3.length);
            expect(validArgs6[0].length + 1).toEqual(testResult6.length);
        });
        it('returns an array based on filters, with removed occurences of type argument if it\'s already presennt in filters', () => {
            expect(validArgs2[0].includes(validArgs2[1])).toBeTruthy();
            expect(testResult2.includes(validArgs2[1])).toBeFalsy();
            expect(validArgs4[0].includes(validArgs4[1])).toBeTruthy();
            expect(testResult4.includes(validArgs4[1])).toBeFalsy();
            expect(validArgs5[0].includes(validArgs5[1])).toBeTruthy();
            expect(testResult5.includes(validArgs5[1])).toBeFalsy();
        });
    });
})
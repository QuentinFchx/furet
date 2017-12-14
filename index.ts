import * as globby from 'globby';

import { checkFile } from './worker';

export function checkFiles(patterns: string | string[]) {
    globby(patterns, { gitignore: true } as any)
        .then(paths => {
            paths.forEach(path => {
                const res = checkFile(path);
                if (res.matches.length) console.log(res);
            })
        })
}

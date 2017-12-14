import { readFileSync } from 'fs';

import { Github, IHost } from './hosts/github';

export function checkFile(path: string) {
    const fileContent = readFileSync(path, 'utf8')

    const hosts: IHost[] = [new Github()]

    let allMatches: string[] = [];
    hosts.forEach(host => {
        const flaggedRe = new RegExp(host.urlRegex.source, "gi");
        const matches = fileContent.match(flaggedRe)
        if (matches) {
            matches.forEach(url => {
                host.handleUrl(url)
            })
            allMatches = allMatches.concat(matches)
        }
    })

    return {
        path,
        matches: allMatches
    }
}

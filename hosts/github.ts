import axios from 'axios';

export interface IHost {
    urlRegex: RegExp;
    handleUrl(url: string): any;
}

export class Github implements IHost {
    urlRegex = /github.com\/(?:\w|-)+\/(?:\w|-)+\/issues\/\d+/;

    handleUrl(url: string) {
        const issuePath = url.substr('github.com/'.length);
        // GET /repos/:owner/:repo/issues/:number
        axios.get(`https://api.github.com/repos/${issuePath}`)
            .then(res => {
                const data = res.data;
                console.log(data.title, data.state);
            })
    }
}

import { Router } from 'express';

export function routes(router: Router) {
    router.get('/tech', (req, res) => res.status(200).json('Tech base endpoint'));

    // new SearchClient('https://www.pbtech.co.nz/category/peripherals/monitors/shop-all');
    // new SearchClient('https://www.pbtech.co.nz/category/peripherals/monitors/shop-all?pg=1');
    // new ParseClient(join(__dirname, 'monitors.json'));
}

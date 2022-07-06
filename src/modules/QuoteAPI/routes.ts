import { Router } from 'express';
import { Quote } from './Quote';
import { quotes } from './Quotes';

function getRandomQuote(): Quote {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

export function routes(router: Router) {
    router.get(`/quotes`, (req, res) => res.status(200).json(getRandomQuote()));
}

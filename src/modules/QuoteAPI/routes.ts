import { Router } from 'express';
import { Quote } from './Quote';
import { quotes } from './Quotes';

const numQuotes = Object.keys(quotes).length;

function getRandomQuote(): Quote {
    return quotes[Math.floor(Math.random() * numQuotes)];
}

function getQuoteById(id: string): Quote | string {
    if (quotes[id] !== undefined) return quotes[id];
    return `A quote with ID ${id} does not (yet) exist`;
}

export function routes(router: Router) {
    router.get(`/quotes`, (req, res) => res.status(200).json(getRandomQuote()));
    router.get(`/quotes/all`, (req, res) => res.status(200).json(quotes));
    router.get(`/quotes/:id`, (req, res) => res.status(200).json(getQuoteById(req.params.id)));
}

# Lightning News

## Why?

I made this project for a couple reasons: 1. Most news sources are cluttered with advertisements and it is hard to simply glance through what writers are saying about a particular topic. This application consolidates headlines and quick summaries in a no-nonsense feed. If a user would like to read deeper, they can click the highlighted link and go to the article of choice. If the user just wants to see headlines and summaries, they can search keywords and tab through pages as the wish, and they can skip the clutter of most news sources. 2. I wanted to showcase my technical ability across many topics.

## How? 

The news is sourced from NewsAPI and the payments are handled through Strike's API. If the user is unfamiliar with Bitcoin and the Lightning Network, it will be prohibitively hard to make the payment without some guidance. Styling is done with tailwindcss and it is intentionally barebones. The client is built with React and the backend is a node server. 

## Improvements

Currently all clients receive webhooks from Strike when an invoice is updated. Only the relevant client should recieve the update. Data filtering from the news API could also be used to clean up the article summaries. Additional search critera may be added as well.

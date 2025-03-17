# HackHarvard24 Open Data WINNER!

https://devpost.com/software/openlegislation \
https://openlegislation.asahoo.dev

# Tracks
Open-Source Data (1st Place!) 

## MLH Tracks
LlamaIndex (Databricks) \
Cloudflare AI Gateway 

## Inspiration

With elections right around the corner, many young adults are voting for the first time, and may not be equipped with knowledge of the law and current domestic events. We believe that this is a major problem with our nation, and we seek to use open source government data to provide day to day citizens with access to knowledge on legislative activities and current affairs in our nation.

## What it does

OpenLegislation aims to bridge the knowledge gap by providing easy access to legislative information. By leveraging open-source government data, we empower citizens to make informed decisions about the issues that matter most to them. This approach not only enhances civic engagement but also promotes a more educated and participatory democracy Our platform allows users to input an issue they are interested in, and then uses cosine analysis to fetch the most relevant bills currently in Congress related to that issue.

## How we built it

We built this application with a tech stack of MongoDB, ExpressJS, ReactJS, and OpenAI. DataBricks' LlamaIndex with a HuggingFace model was used to generate embeddings for the titles of our bills. We used a Vector Search using Atlas's Vector Search and Mongoose for accurate semantic results when searching for a bill. Additionally, Cloudfare's AI Gateway was used to track calls to GPT-4o for insightful analysis of each bill.

## Challenges we ran into

At first, we tried to use OpenAI's embeddings for each bill's title. However, this brought a lot of issues for our scraper as while the embeddings were really good, they took up a lot of storage and were heavily rate limited. This was not feasible at all. To solve this challenge, we pivoted to a smaller model that uses a pre trained transformer to provide embeddings processed locally instead of through an API call. Although the semantic search was slightly worse, we were able to get satisfactory results for our MVP and be able to expand on different, higher-quality models in the future.

## Accomplishments that we're proud of

We are proud that we have used open source software technology and data to empower the people with transparency and knowledge of what is going on in our government and our nation. We have used the most advanced technology that Cloudfare and Databricks provides and leveraged it for the good of the people. On top of that, we are proud of our technical acheivement of our semantic search, giving the people the bills they want to see. 

## What we learned

During the development of this project, we learned more of how vector embeddings work and are used to provide the best search results. We learned more of Cloudfare and OpenAI's tools in this development and will definitely be using them on future projects. Most importantly, we learned the value of open source data and technology and the impact it can have on our society.

## What's next for OpenLegislation

For future progress of OpenLegislation, we plan to expand to local states! Constituents can know directly what is going on in their state on top of their country with this addition and actually be able to receive updates on what officials they elected are actually proposing. In addition, we would expand our technology by using more advanced embeddings for more tailored searches. Finally, we would implore more data anlysis methods with help from Cloudfare and DataBricks' Open-Source technologies to help make this important data more available and transparant for the good of society.

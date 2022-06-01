# Overview

This repository contains a BigFix console dashboard that allows you to use BigFix Query from the Windows console.

## Installation

I prefer to put dashboards in their own sites so I would create a new site called "C3 Query Dashboard", click Files under the site, right click and `Add Files...`

You do not need to subscribe any computers to this site.

Select all of the files in the `src` directory of the repository. Do not check `Send to clients`.

## Usage

Open the `BigFix Query` Dashboard.

Select a computer group to target with your query

Enter your query in the input box and press "Query". Results will start streaming in.

If you'd like to create an analysis using the query simply press, `Create Analysis`
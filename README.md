# CardGame

Testbed for basic card game ideas

I'd like to play around with card game ideas via a series of rapidly developed prototypes with a few considerations:

 - As many elements of the game should be generated as possible
 - A game should be based of a seed value
 - I want the cards to be quite lean as far as stats go, stick to a few simple numbers
 - A complete games should not take more than 30 mins
 - The games should reward quick thinking
 - "Bad luck" should not be a factor in losing a game, every generated game should be viable

A simple pseudo-random number generator (or several initialised from a game "seed") will be critical for keeping games fresh and unpredictable. I'd also like to allow players to "make" cards via a simple interface somehow, but ideally not let them optimise out the "fun" with imbalanced cards.

This project is also a good excuse to explore different ways of "rendering" the game in a browser window. Is this a good excuse to tinker with HTML templates, shadow dom, and skip frameworks such as React, Angular, or Vue? I've also been very interested in playing with canvas and the latest web3d tech, possibly a bit advanced for cards, but let's aim high!

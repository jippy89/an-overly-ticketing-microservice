# Introduction
There is actually 4 ways of doing this. Checkout lecture **422. Expiration Options**. 

1. Use `setTimeout`
2. Use (something)
3. Use **scheduled event** or **scheduled message**
However NATS Streaming doesn't support this. If there's such feature, this repository possibly is not needed.
4. Use **Bull JS** and **Redis** (Currently used)
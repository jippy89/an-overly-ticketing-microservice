# Introduction
There is actually 4 ways of doing this. Checkout lecture **422. Expiration Options**. 

1. Use `setTimeout`
2. Use NATS redelivery by not `ack`-ing when the time is not passed yet.
3. Use **scheduled event** or **scheduled message**
However NATS Streaming doesn't support this. If there's such feature, this repository possibly is not needed.
4. Use **Bull JS** and **Redis** (Currently used)

# Kubernetes Setup
1. Go to this directory
2. Run `docker build -t irfandyjip89/ticketing_expiration`
3. Run `docker push irfandyjip89/ticketing_expiration`
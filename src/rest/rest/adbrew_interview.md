# Ad Scheduling Interview Question

## Problem Statement

You are working on an ad bidding system that needs to optimize bids based on expected click volume throughout the day. You have been given the following incomplete code:

```python
class WeightBasedScheduler:
    def schedule(self, min_bid, max_bid):
        data = DataProvider().get_data()
        clicks = [d.clicks for d in data]
        # clicks is a 24-length array of clicks an ad receives for each hour
        # based on the distribution of clicks, we need to return a list of bids for each hour
        # min_bid = minimum bid for the ad
        # max_bid = maximum bid for the ad



        return clicks  # This is wrong - you need to return bids, not clicks
```

## Requirements

1. **Input**:

   - `min_bid`: The minimum amount you're willing to bid
   - `max_bid`: The maximum amount you're willing to bid
   - `clicks`: A 24-element array representing expected clicks for each hour (0-23)

2. **Output**:

   - A 24-element array of bid amounts, one for each hour

3. **Logic**:
   - Hours with more clicks should receive higher bids (closer to max_bid)
   - Hours with fewer clicks should receive lower bids (closer to min_bid)
   - The bidding should scale proportionally between min_bid and max_bid

## Questions to Answer

1. **How would you calculate the appropriate bid for each hour based on the click distribution?**

2. **What approach would you use to scale bids between the minimum and maximum values?**

3. **How would you handle edge cases (e.g., all hours have the same number of clicks)?**

4. **Can you implement the complete `schedule` method?**

## Example

If you have:

- `min_bid = 1.0`
- `max_bid = 5.0`
- `clicks = [10, 50, 100, 30, ...]` (24 hours)

Then hours with 100 clicks should get bids close to $5.00, while hours with 10 clicks should get bids close to $1.00.

**Bonus**: What other scaling approaches could you consider besides linear scaling?

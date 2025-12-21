# LastSTX

**The ultimate onchain auction game on Stacks — be the last bidder to claim the entire STX pot!**

## Overview

LastSTX is a thrilling, fully onchain auction game built on the **Stacks** blockchain. Players join live bidding rounds by placing fixed-amount bids in STX.

**Key mechanics:**
- Each bid adds to the shared prize pot.
- Every new bid **resets the countdown timer**.
- When the timer finally runs out with no new bids, the **last bidder wins the entire pot**.

It's a game of strategy, timing, and nerves — perfect for crypto degens who love high-stakes chaos!

Inspired by classic "last bid wins" formats but secured by Bitcoin via Stacks' Proof-of-Transfer consensus.

## How It Works

1. **Join a Round** — Anyone can start or join an active auction round.
2. **Place a Bid** — Send a fixed STX amount (configurable per round, e.g., 10 STX per bid).
3. **Timer Reset** — Each valid bid resets the clock (e.g., back to 10 minutes).
4. **Build the Pot** — All bids accumulate in the contract's prize pool.
5. **Win Big** — If no one bids before the timer expires, the last bidder claims **100% of the pot** (minus any optional small protocol fee).

No rugs, no custodians — everything is transparent and executed by Clarity smart contracts.

## Features

- Fully decentralized and onchain
- Secured by Bitcoin through Stacks
- Live timer tracking via frontend or block explorers
- Configurable bid amounts and timer durations
- View active rounds, pot sizes, and leaderboards
- Future plans: Multiple concurrent rounds, NFT prizes, leaderboards

## Tech Stack

- **Blockchain**: Stacks (Layer 2 on Bitcoin)
- **Smart Contracts**: Written in [Clarity](https://clarity-lang.org/) for predictability and safety
- **Frontend**: React/Next.js + Stacks.js / Hiro libraries (coming soon)
- **Deployment**: Testnet first, then mainnet

## Getting Started

### Prerequisites
- Stacks wallet (e.g., Leather or Xverse)
- STX tokens (use testnet for development)
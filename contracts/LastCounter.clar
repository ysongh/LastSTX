;; Last Counter Contract
;; This contract maintains a counter that can be incremented with a 1 STX payment

;; Define the contract owner (deployer)
(define-constant contract-owner tx-sender)

;; Error constants
(define-constant err-owner-only (err u403))
(define-constant err-transfer-failed (err u404))

;; Define a data variable to store the counter
(define-data-var counter uint u0)

;; Define a data variable to store the last caller's address
(define-data-var last-caller (optional principal) none)

;; Define a data variable to store the last increment time
(define-data-var last-increment-time (optional uint) none)

;; Public function to increment the counter (costs 1 STX)
(define-public (increment)
  (begin
    ;; Transfer 1 STX from caller to contract
    (try! (stx-transfer? u1000000 tx-sender (as-contract tx-sender)))
    ;; Update state
    (var-set counter (+ (var-get counter) u1))
    (var-set last-caller (some tx-sender))
    (var-set last-increment-time (some stacks-block-height))
    (ok (var-get counter))))

;; Read-only function to get the current counter value
(define-read-only (get-counter)
  (ok (var-get counter)))

;; Read-only function to get the last caller address
(define-read-only (get-last-caller)
  (ok (var-get last-caller)))

;; Read-only function to get the last increment time
(define-read-only (get-last-increment-time)
  (ok (var-get last-increment-time)))

;; Read-only function to get contract balance
(define-read-only (get-balance)
  (ok (stx-get-balance (as-contract tx-sender))))

;; Public function to reset the counter (only contract owner)
(define-public (reset)
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (var-set counter u0)
    (ok true)))

;; Public function to withdraw specific amount (only contract owner)
(define-public (withdraw (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (as-contract (stx-transfer? amount tx-sender recipient))))

;; Public function to withdraw all STX from contract (only contract owner)
(define-public (withdraw-all)
  (let ((balance (stx-get-balance (as-contract tx-sender))))
    (begin
      (asserts! (is-eq tx-sender contract-owner) err-owner-only)
      (try! (as-contract (stx-transfer? balance tx-sender contract-owner)))
      (ok balance))))
      
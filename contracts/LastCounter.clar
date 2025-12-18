;; Last Counter Contract
;; This contract maintains a counter that can be incremented and return the last caller

;; Define the contract owner (deployer)
(define-constant contract-owner tx-sender)

;; Define a data variable to store the counter
(define-data-var counter uint u0)

;; Define a data variable to store the last caller's address
(define-data-var last-caller (optional principal) none)

;; Define a data variable to store the last increment time
(define-data-var last-increment-time (optional uint) none)

;; Public function to increment the counter
(define-public (increment)
  (begin
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

;; Public function to reset the counter (only contract owner)
(define-public (reset)
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (var-set counter u0)
    (ok true)))
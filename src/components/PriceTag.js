import React from "react";

/**
 * This is just to keep consistency in price display
 */
export default function PriceTag({ amount, currency }) {
  return (
    <span>
      {currency} {amount}
    </span>
  );
}

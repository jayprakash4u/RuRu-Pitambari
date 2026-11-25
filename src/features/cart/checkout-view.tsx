"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { comboAsProducts } from "@/features/combos/data/combos";
import { products } from "@/features/products/data/products";

import { useCart } from "./cart-context";
import styles from "./checkout.module.css";

const allCatalogProducts = [...products, ...comboAsProducts];

function createOrderId(): string {
  return `RP-${Date.now().toString().slice(-6)}`;
}

function createOrderDate(): string {
  return new Date().toLocaleDateString("en-NP", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const nprFormatter = new Intl.NumberFormat("en-NP", {
  currency: "NPR",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
  style: "currency",
});

interface ConfirmedOrder {
  orderId: string;
  orderDate: string;
  fullName: string;
  phone: string;
  email?: string;
  panNumber?: string;
  deliveryZone: "kathmandu_valley" | "outside_valley";
  zoneLabel: string;
  cityDistrict: string;
  wardArea: string;
  streetAddress: string;
  landmark?: string;
  orderNote?: string;
  paymentMethod: "cod" | "qr";
  paymentLabel: string;
  items: Array<{
    productId: string;
    productName: string;
    variantLabel: string;
    unitPrice: number;
    quantity: number;
    lineTotal: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
}

export function CheckoutView() {
  const { clearCart, items } = useCart();

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [deliveryZone, setDeliveryZone] = useState<"kathmandu_valley" | "outside_valley">(
    "kathmandu_valley",
  );
  const [cityDistrict, setCityDistrict] = useState("Lalitpur");
  const [wardArea, setWardArea] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "qr">("cod");

  // Confirmed order state
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  const detailedItems = items.flatMap((item) => {
    const product = allCatalogProducts.find((candidate) => candidate.id === item.productId);
    const variant = product?.variants[item.variantIndex];
    return product && variant ? [{ ...item, product, variant }] : [];
  });

  const subtotal = detailedItems.reduce(
    (sum, item) => sum + item.quantity * item.variant.priceNpr,
    0,
  );

  // Delivery fee calculation
  const isKathmanduValley = deliveryZone === "kathmandu_valley";
  const freeDeliveryThreshold = isKathmanduValley ? 1000 : 2000;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const baseDeliveryFee = isKathmanduValley ? 50 : 120;
  const deliveryFee = isFreeDelivery ? 0 : baseDeliveryFee;
  const grandTotal = subtotal + deliveryFee;

  function handleSubmitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const orderId = createOrderId();
    const orderDate = createOrderDate();

    const orderData: ConfirmedOrder = {
      orderId,
      orderDate,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      panNumber: panNumber.trim() || undefined,
      deliveryZone,
      zoneLabel: isKathmanduValley
        ? "Kathmandu Valley (Ktm, Lalitpur, Bhaktapur)"
        : "Outside Valley (All Nepal Major Cities)",
      cityDistrict: cityDistrict.trim(),
      wardArea: wardArea.trim(),
      streetAddress: streetAddress.trim(),
      landmark: landmark.trim() || undefined,
      orderNote: orderNote.trim() || undefined,
      paymentMethod,
      paymentLabel: paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Fonepay QR on Delivery",
      items: detailedItems.map((item) => ({
        lineTotal: item.variant.priceNpr * item.quantity,
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        unitPrice: item.variant.priceNpr,
        variantLabel: item.variant.label,
      })),
      subtotal,
      deliveryFee,
      grandTotal,
    };

    setConfirmedOrder(orderData);
    clearCart();

    if (typeof window !== "undefined") {
      window.scrollTo({ behavior: "smooth", top: 0 });
    }
  }

  // ========================================================
  // 1. ORDER CONFIRMATION & OFFICIAL DELIVERY BILL RECEIPT
  // ========================================================
  if (confirmedOrder) {
    return (
      <div className={styles.billReceiptWrapper}>
        <div className={styles.billReceipt}>
          {/* Header & Letterhead */}
          <div className={styles.receiptHeader}>
            <div className={styles.companyBranding}>
              <h2 className={styles.brandName}>RURU PITAMBARI</h2>
              <p className={styles.companySubtitle}>
                Pythree Products · Heritage Metal Care & Cleaning
              </p>
              <div className={styles.companyAddress}>
                Lalitpur, Bagmati Province, Nepal
                <br />
                Phone: +977 985-1037659 | Email: info@rurupitambari.com
              </div>
            </div>

            <div className={styles.invoiceMeta}>
              <span className={styles.billBadge}>Official Delivery Bill & Challan</span>
              <p className={styles.orderIdText}>Order #{confirmedOrder.orderId}</p>
              <p className={styles.orderDateText}>Date: {confirmedOrder.orderDate}</p>
            </div>
          </div>

          {/* Customer & Delivery Destination Grid */}
          <div className={styles.billDetailsGrid}>
            <div className={styles.partyBox}>
              <h3 className={styles.partyTitle}>Billed To (Customer Details)</h3>
              <p className={styles.partyName}>{confirmedOrder.fullName}</p>
              <p className={styles.partyText}>
                <strong>Phone:</strong> {confirmedOrder.phone}
              </p>
              {confirmedOrder.email && (
                <p className={styles.partyText}>
                  <strong>Email:</strong> {confirmedOrder.email}
                </p>
              )}
              {confirmedOrder.panNumber && (
                <p className={styles.partyText}>
                  <strong>PAN / VAT No:</strong> {confirmedOrder.panNumber}
                </p>
              )}
            </div>

            <div className={styles.partyBox}>
              <h3 className={styles.partyTitle}>Deliver To (Shipping Address)</h3>
              <p className={styles.partyText}>
                <strong>Address:</strong> {confirmedOrder.streetAddress}
              </p>
              {confirmedOrder.landmark && (
                <p className={styles.partyText}>
                  <strong>Landmark:</strong> {confirmedOrder.landmark}
                </p>
              )}
              <p className={styles.partyText}>
                <strong>Area / Ward:</strong> {confirmedOrder.wardArea}
              </p>
              <p className={styles.partyText}>
                <strong>City & Region:</strong> {confirmedOrder.cityDistrict},{" "}
                {confirmedOrder.zoneLabel}
              </p>
            </div>
          </div>

          {/* Itemized Products Table */}
          <div className={styles.billTableWrapper}>
            <table className={styles.billTable}>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th style={{ width: "50%" }}>Product & Specification</th>
                  <th className={styles.alignCenter} style={{ width: "12%" }}>
                    Qty
                  </th>
                  <th className={styles.alignRight} style={{ width: "16%" }}>
                    Unit Price
                  </th>
                  <th className={styles.alignRight} style={{ width: "17%" }}>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {confirmedOrder.items.map((item, idx) => (
                  <tr key={`${item.productId}-${idx}`}>
                    <td>{idx + 1}</td>
                    <td>
                      <strong>{item.productName}</strong>
                      <span
                        style={{
                          color: "#706c63",
                          display: "block",
                          fontSize: "0.75rem",
                          marginTop: "0.15rem",
                        }}
                      >
                        {item.variantLabel}
                      </span>
                    </td>
                    <td className={styles.alignCenter}>{item.quantity}</td>
                    <td className={styles.alignRight}>{nprFormatter.format(item.unitPrice)}</td>
                    <td className={styles.alignRight}>{nprFormatter.format(item.lineTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Financials & Dispatch Note */}
          <div className={styles.billBottomSection}>
            <div className={styles.billNotesCard}>
              <h4 className={styles.notesHeading}>Delivery & Verification Note</h4>
              <p className={styles.billNoticeP}>
                • Payment Method: <strong>{confirmedOrder.paymentLabel}</strong>
              </p>
              <p className={styles.billNoticeP} style={{ marginTop: "0.25rem" }}>
                • Our delivery rider will bring a physical duplicate copy of this delivery bill with
                your package.
              </p>
              {confirmedOrder.orderNote && (
                <p className={styles.billNoticeP} style={{ marginTop: "0.25rem" }}>
                  • <em>Instruction: “{confirmedOrder.orderNote}”</em>
                </p>
              )}
            </div>

            <div>
              <table className={styles.billTotalsTable}>
                <tbody>
                  <tr>
                    <td>Subtotal:</td>
                    <td className={styles.alignRight}>
                      {nprFormatter.format(confirmedOrder.subtotal)}
                    </td>
                  </tr>
                  <tr>
                    <td>Delivery Fee:</td>
                    <td className={styles.alignRight}>
                      {confirmedOrder.deliveryFee === 0 ? (
                        <span style={{ color: "#2e6930", fontWeight: 700 }}>FREE</span>
                      ) : (
                        nprFormatter.format(confirmedOrder.deliveryFee)
                      )}
                    </td>
                  </tr>
                  <tr className={styles.grandRow}>
                    <td>Total Due on Delivery:</td>
                    <td className={styles.alignRight}>
                      {nprFormatter.format(confirmedOrder.grandTotal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons Below Receipt */}
        <div className={styles.receiptActions}>
          <button
            className={styles.printBtn}
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
            type="button"
          >
            <svg
              aria-hidden="true"
              fill="none"
              height="16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="16"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect height="8" width="12" x="6" y="14" />
            </svg>
            Print Delivery Bill
          </button>

          <Link className={styles.continueShoppingBtn} href="/products">
            Continue Shopping →
          </Link>
        </div>
      </div>
    );
  }

  // ========================================================
  // 2. EMPTY CART VIEW
  // ========================================================
  if (!detailedItems.length) {
    return (
      <div className={styles.emptyContainer}>
        <svg
          aria-hidden="true"
          fill="none"
          height="48"
          stroke="#8c1d24"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          style={{ margin: "0 auto 0.5rem" }}
          viewBox="0 0 24 24"
          width="48"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
        <h2 className={styles.emptyTitle}>Your cart is currently empty</h2>
        <p className={styles.emptyText}>
          Add items to your cart to proceed with checkout and generate your delivery bill.
        </p>
        <Link className={styles.browseBtn} href="/products">
          Explore Products
        </Link>
      </div>
    );
  }

  // ========================================================
  // 3. FULL CHECKOUT FORM WITH STRUCTURED DELIVERY & BILLING
  // ========================================================
  return (
    <div className={styles.checkoutRoot}>
      <form className={styles.layout} onSubmit={handleSubmitOrder}>
        {/* Left Column: Form Fields */}
        <div className={styles.form}>
          {/* Card 1: Contact & Billing Identity */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>1</span>
              <div>
                <h2 className={styles.sectionTitle}>Contact & Billing Details</h2>
                <p className={styles.sectionDesc}>
                  These details will appear on the official delivery bill attached to your order.
                </p>
              </div>
            </div>

            <div className={styles.fieldsGrid}>
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="fullName">
                    Full Name / Organization <span className={styles.required}>*</span>
                  </label>
                  <input
                    autoComplete="name"
                    className={styles.inputField}
                    id="fullName"
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Shrestha"
                    required
                    type="text"
                    value={fullName}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="phone">
                    Mobile Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    autoComplete="tel"
                    className={styles.inputField}
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98XXXXXXXX"
                    required
                    type="tel"
                    value={phone}
                  />
                </div>
              </div>

              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="email">
                    Email Address{" "}
                    <span className={styles.optionalBadge}>(Optional, for bill copy)</span>
                  </label>
                  <input
                    autoComplete="email"
                    className={styles.inputField}
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="panNumber">
                    PAN / VAT Number{" "}
                    <span className={styles.optionalBadge}>(Optional, for tax bill)</span>
                  </label>
                  <input
                    className={styles.inputField}
                    id="panNumber"
                    onChange={(e) => setPanNumber(e.target.value)}
                    placeholder="e.g. 600123456"
                    type="text"
                    value={panNumber}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Delivery & Shipping Destination */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>2</span>
              <div>
                <h2 className={styles.sectionTitle}>Delivery Destination</h2>
                <p className={styles.sectionDesc}>
                  Provide exact address details for timely courier delivery.
                </p>
              </div>
            </div>

            <div className={styles.fieldsGrid}>
              {/* Zone selector */}
              <div className={styles.zoneOptions}>
                <label
                  className={`${styles.zoneOption} ${
                    deliveryZone === "kathmandu_valley" ? styles.zoneOptionSelected : ""
                  }`}
                >
                  <input
                    checked={deliveryZone === "kathmandu_valley"}
                    className={styles.zoneRadio}
                    name="deliveryZone"
                    onChange={() => {
                      setDeliveryZone("kathmandu_valley");
                      if (!["Kathmandu", "Lalitpur", "Bhaktapur"].includes(cityDistrict)) {
                        setCityDistrict("Lalitpur");
                      }
                    }}
                    type="radio"
                  />
                  <div className={styles.zoneInfo}>
                    <span className={styles.zoneTitle}>Kathmandu Valley</span>
                    <span className={styles.zoneSubtitle}>Lalitpur, Kathmandu, Bhaktapur</span>
                    <span className={styles.zonePrice}>
                      {subtotal >= 1000 ? "FREE Delivery (Above Rs 1,000)" : "Rs 50 Delivery Fee"}
                    </span>
                  </div>
                </label>

                <label
                  className={`${styles.zoneOption} ${
                    deliveryZone === "outside_valley" ? styles.zoneOptionSelected : ""
                  }`}
                >
                  <input
                    checked={deliveryZone === "outside_valley"}
                    className={styles.zoneRadio}
                    name="deliveryZone"
                    onChange={() => {
                      setDeliveryZone("outside_valley");
                      if (["Kathmandu", "Lalitpur", "Bhaktapur"].includes(cityDistrict)) {
                        setCityDistrict("Pokhara");
                      }
                    }}
                    type="radio"
                  />
                  <div className={styles.zoneInfo}>
                    <span className={styles.zoneTitle}>Outside Valley</span>
                    <span className={styles.zoneSubtitle}>All major Nepal cities</span>
                    <span className={styles.zonePrice}>
                      {subtotal >= 2000 ? "FREE Delivery (Above Rs 2,000)" : "Rs 120 Delivery Fee"}
                    </span>
                  </div>
                </label>
              </div>

              {/* City & Ward */}
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="cityDistrict">
                    City / District <span className={styles.required}>*</span>
                  </label>
                  {isKathmanduValley ? (
                    <select
                      className={styles.selectField}
                      id="cityDistrict"
                      onChange={(e) => setCityDistrict(e.target.value)}
                      value={cityDistrict}
                    >
                      <option value="Lalitpur">Lalitpur</option>
                      <option value="Kathmandu">Kathmandu</option>
                      <option value="Bhaktapur">Bhaktapur</option>
                    </select>
                  ) : (
                    <input
                      className={styles.inputField}
                      id="cityDistrict"
                      onChange={(e) => setCityDistrict(e.target.value)}
                      placeholder="e.g. Pokhara, Butwal, Biratnagar, Narayangarh"
                      required
                      type="text"
                      value={cityDistrict}
                    />
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="wardArea">
                    Area / Tole / Ward No. <span className={styles.required}>*</span>
                  </label>
                  <input
                    className={styles.inputField}
                    id="wardArea"
                    onChange={(e) => setWardArea(e.target.value)}
                    placeholder="e.g. Ward 4, Kumaripati / Pulchowk"
                    required
                    type="text"
                    value={wardArea}
                  />
                </div>
              </div>

              {/* Street Address & Landmark */}
              <div className={styles.twoColumns}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="streetAddress">
                    Street Address & House / Building <span className={styles.required}>*</span>
                  </label>
                  <input
                    autoComplete="street-address"
                    className={styles.inputField}
                    id="streetAddress"
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. Near Batuk Bhairab Temple, House 24"
                    required
                    type="text"
                    value={streetAddress}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="landmark">
                    Nearest Landmark <span className={styles.optionalBadge}>(Optional)</span>
                  </label>
                  <input
                    className={styles.inputField}
                    id="landmark"
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Opposite Krishna Mandir"
                    type="text"
                    value={landmark}
                  />
                </div>
              </div>

              {/* Delivery Note */}
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="orderNote">
                  Delivery Instruction / Note{" "}
                  <span className={styles.optionalBadge}>(Optional)</span>
                </label>
                <textarea
                  className={styles.textareaField}
                  id="orderNote"
                  onChange={(e) => setOrderNote(e.target.value)}
                  placeholder="e.g. Please call 15 minutes before arrival, or deliver after 11 AM."
                  value={orderNote}
                />
              </div>
            </div>
          </div>

          {/* Card 3: Payment Method */}
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>3</span>
              <div>
                <h2 className={styles.sectionTitle}>Payment Method</h2>
                <p className={styles.sectionDesc}>
                  Select how you would like to pay when receiving your delivery bill and parcel.
                </p>
              </div>
            </div>

            <div className={styles.paymentOptions}>
              <label
                className={`${styles.paymentCard} ${
                  paymentMethod === "cod" ? styles.paymentCardActive : ""
                }`}
              >
                <input
                  checked={paymentMethod === "cod"}
                  className={styles.paymentRadio}
                  name="paymentMethod"
                  onChange={() => setPaymentMethod("cod")}
                  type="radio"
                />
                <div>
                  <span className={styles.paymentTitle}>
                    Cash on Delivery (COD)
                    <span className={styles.paymentBadge}>Most Popular</span>
                  </span>
                  <p className={styles.paymentDesc}>
                    Pay with exact cash directly to the delivery courier after inspecting your
                    package and bill.
                  </p>
                </div>
              </label>

              <label
                className={`${styles.paymentCard} ${
                  paymentMethod === "qr" ? styles.paymentCardActive : ""
                }`}
              >
                <input
                  checked={paymentMethod === "qr"}
                  className={styles.paymentRadio}
                  name="paymentMethod"
                  onChange={() => setPaymentMethod("qr")}
                  type="radio"
                />
                <div>
                  <span className={styles.paymentTitle}>Fonepay QR on Delivery</span>
                  <p className={styles.paymentDesc}>
                    Scan the rider’s Fonepay QR code using any Nepali mobile banking app (eSewa,
                    Khalti, or bank app).
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Reassurance Notice */}
          <div className={styles.noticeBox}>
            <svg
              aria-hidden="true"
              className={styles.noticeIcon}
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="20"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" x2="12" y1="8" y2="12" />
              <line x1="12" x2="12.01" y1="16" y2="16" />
            </svg>
            <div>
              <strong>Official Delivery Bill Guaranteed:</strong> An official itemized delivery
              challan and tax receipt will be placed inside your parcel. Our dispatch representative
              will call you before delivery to confirm availability.
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Bill Calculation */}
        <aside className={styles.summaryAside}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            {/* List of items */}
            <div className={styles.summaryItemsList}>
              {detailedItems.map(({ product, quantity, variant, variantIndex }) => (
                <div className={styles.summaryItem} key={`${product.id}-${variantIndex}`}>
                  <Image
                    alt={product.name}
                    className={styles.summaryItemImage}
                    height={44}
                    src={product.image}
                    width={44}
                  />
                  <div className={styles.summaryItemInfo}>
                    <p className={styles.summaryItemName}>{product.name}</p>
                    <p className={styles.summaryItemVariant}>
                      {variant.label} × {quantity}
                    </p>
                  </div>
                  <span className={styles.summaryItemPrice}>
                    {nprFormatter.format(variant.priceNpr * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className={styles.totalsList}>
              <div className={styles.totalRow}>
                <span>Subtotal ({detailedItems.length} items)</span>
                <span className={styles.totalRowVal}>{nprFormatter.format(subtotal)}</span>
              </div>

              <div className={styles.totalRow}>
                <span>Delivery Fee ({isKathmanduValley ? "Ktm Valley" : "Outside Valley"})</span>
                <span className={styles.totalRowVal}>
                  {deliveryFee === 0 ? (
                    <span className={styles.freeTag}>FREE</span>
                  ) : (
                    nprFormatter.format(deliveryFee)
                  )}
                </span>
              </div>

              <div className={styles.grandTotalRow}>
                <span>Total Payable</span>
                <span className={styles.grandTotalVal}>{nprFormatter.format(grandTotal)}</span>
              </div>
              <div className={styles.taxNotice}>Inclusive of all applicable taxes</div>
            </div>

            {/* Place Order CTA */}
            <button className={styles.submitButton} type="submit">
              <span>Confirm & Place Order</span>
              <svg
                aria-hidden="true"
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                width="16"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <Link className={styles.backToCartLink} href="/cart">
              ← Return to Cart
            </Link>

            {/* Trust Indicators */}
            <div className={styles.trustList}>
              <div className={styles.trustItem}>
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="14"
                  stroke="#2e6930"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="14"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>100% Genuine Ruru Pitambari Guaranteed</span>
              </div>
              <div className={styles.trustItem}>
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="14"
                  stroke="#2e6930"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="14"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Official Delivery Bill & Challan included</span>
              </div>
              <div className={styles.trustItem}>
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="14"
                  stroke="#2e6930"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="14"
                >
                  <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Secure payment upon parcel inspection</span>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

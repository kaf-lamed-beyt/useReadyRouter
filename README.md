# useReadyRouter

A lightweight Next.js hook for safely accessing dynamic route parameters.

It guards against undefined values during initial render or during a "hard-reload", making it ideal for use with data fetching libraries like [SWR](https://swr.vercel.app/) in Next.js applications.

## Installation

Install the package from npm with your favorite package manager:

```shell
npm install use-ready-router
# or
yarn add use-ready-router
# or
pnpm add use-ready-router
```

## Usage

The `useReadyRouter` hook takes a string parameter representing the name of the dynamic route parameter you want to access. This should match the name you've used in your Next.js dynamic route.

### Basic Usage

```tsx
import { useReadyRouter } from "use-ready-router/dist";

export default function CustomerPage() {
  const { value: customerId, isReady } = useReadyRouter("id");
  // Use customerId in your data fetching hook or component
}
```

### With SWR

Ideally, you'll want to pass the value from your dynamic path to a query or custom data-hook, like the one below:

```tsx
import { useReadyRouter } from "use-ready-router";
import { useCustomerPayments } from "@hooks/swr";

export default function CustomerPaymentsPage() {
  const { value: customerId } = useReadyRouter("id");
  const { data, isLoading } = useCustomerPayments(customerId);

  return (
    <AppLayout>
      <CustomerPayments transactions={data} loading={isLoading} />
    </AppLayout>
  );
}
```

### Handling Loading State

You can use the `isReady` value to display a loading component if the router doesn't become ready on time:

```tsx
import { CenterSpinner } from "@components/ui";
import { useReadyRouter } from "use-ready-router";

export default function CustomerPaymentsPage() {
  const { value: customerId, isReady } = useReadyRouter("id");

  if (!isReady) return <CenterSpinner containerHeight="100vh" />;

  return <AppLayout>{/* Your component logic here */}</AppLayout>;
}
```

## Using a Custom Parser

The `useReadyRouter` hook accepts an optional second parameter: a custom parser function. This function allows you to transform the raw query parameter value into the desired type or format.

### Parser Example 1

```tsx
import { useReadyRouter } from "use-ready-router";

export default function CustomerPage() {
  const { value: customerId } = useReadyRouter("id", (value) => Number(value));
  // customerId will be a number, or NaN if the conversion failed
}
```

### Parser Example 2

You can use more complex parsing logic if needed:

```tsx
import { useReadyRouter } from "use-ready-router";

const parseDateRange = (value: string | string[] | undefined) => {
  if (typeof value === "string") {
    const [start, end] = value.split(",");
    return {
      startDate: new Date(start),
      endDate: new Date(end),
    };
  }
  return { startDate: new Date(), endDate: new Date() }; // Default values
};

export default function ReportPage() {
  const { value: dateRange } = useReadyRouter("range", parseDateRange);
  // dateRange will be an object with startDate and endDate properties
}
```

Remember, the parser function should handle all possible input types (`string | string[] | undefined`) that can come from `router.query`.

## TypeScript Support

`useReadyRouter` is written in TypeScript and provides full type safety. The return type of the hook will match the return type of your parser function, or default to `string | string[] | undefined` if no parser is provided.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

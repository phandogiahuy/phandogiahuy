## Inefficiencies and Anti-Patterns
### 1. Unnecessary recalculations
```
const getPriority = (blockchain: any): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100
    case 'Ethereum':
      return 50
    case 'Arbitrum':
      return 30
    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20
    default:
      return -99
  }
}
```
#### Improment
Use **useCallback** to memoize the getPriority function, preventing redundant computations (but with **React 19** with ReactCompiler, this is maybe unnecessary)
``` 
const getPriority = useCallback((blockchain: any): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100
    case 'Ethereum':
      return 50
    case 'Arbitrum':
      return 30
    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20
    default:
      return -99
  }
}, []); 
```
### 2. Unnecessary iterations

```
const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);
```
#### Improment
 **Combine filtering and sorting** in a single pass over the balances array to optimize performance.
```
const sortedBalances = useMemo(() => {
  return balances
    .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
    .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
}, [balances, prices]); 
```
### 3. Creating a unnecessary new array for calculating formatted

```
 const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

```
#### Improment
- **Removing** the need for the intermediate array. 
- **Calculate the formatted value directly** within the rows mapping. 
```
const rows = sortedBalances.map((balance, index) => {
  const usdValue = prices[balance.currency] * balance.amount;
  return (
    <WalletRow 
      className={classes.row}
      key={index}
      amount={balance.amount}
      usdValue={usdValue}
      formattedAmount={balance.amount.toFixed()} 
    />
  );
});
```
Calculating directly
```
formattedAmount={balance.amount.toFixed()}
```

### Refactored version of the code

```
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = useCallback((blockchain: any): number => {
   switch (blockchain) {
    case 'Osmosis':
      return 100
    case 'Ethereum':
      return 50
    case 'Arbitrum':
      return 30
    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20
    default:
      return -99
  }
}, []); 
  
  //
  const sortedBalances = useMemo(() => {
   return balances
    .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
    .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
}, [balances, prices]); 

  
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed()}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}

```

    





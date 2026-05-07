import Button from './Button';

function QuantityControler({ decrement, increment, quantity }) {
  return (
    <div className="flex items-center space-x-3 rounded-full border border-yellow-500 bg-yellow-300 p-1">
      <Button type="xsmall" onClick={decrement}>
        {quantity > 1 ? '-' : `${'\u2715' /*'x'*/}`}
      </Button>
      <p className="inline-block text-base">{quantity}</p>
      <Button disabled={quantity >= 10} type="xsmall" onClick={increment}>
        +
      </Button>
    </div>
  );
}

export default QuantityControler;

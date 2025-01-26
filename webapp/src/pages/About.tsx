export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        About Our Todo DApp
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Key Technologies Used:</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
            Ethereum Foundry - For solidity smart contract development
          </li>
          <li className="flex items-start">
            <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
            React - Frontend framework
          </li>
          <li className="flex items-start">
            <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
            TypeScript - For type-safe JavaScript
          </li>
          <li className="flex items-start">
            <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
            MetaMask - Ethereum wallet integration
          </li>
          <li className="flex items-start">
            <span className="w-4 h-4 bg-orange-500 rounded-full mr-2"></span>
            Vite - Build tool for fast development
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">How It Works:</h2>
        <ol className="space-y-3 list-decimal ml-4">
          <li>Users interact with the dapp through the React interface</li>
          <li>
            The frontend communicates with the smart contract on the Ethereum
            blockchain via MetaMask
          </li>
          <li>
            Tasks are stored securely on-chain while being easily accessible
            through the dapp UI
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Why This Matters:</h2>
        <p className="text-gray-600">
          This dapp demonstrates how decentralized applications can leverage
          blockchain technology to provide secure, transparent, and immutable
          data storage.
        </p>
      </section>
    </div>
  );
}

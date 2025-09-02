export default function AdminPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tina CMS Admin</h1>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Setup Required</h2>
          <p className="mb-4">To use the Tina CMS admin interface, you need to:</p>
          
          <ol className="list-decimal list-inside space-y-2 mb-6">
            <li>Create a free account at <a href="https://app.tina.io" target="_blank" className="text-blue-600 hover:underline">app.tina.io</a></li>
            <li>Create a new project and connect your GitHub repository</li>
            <li>Copy your Client ID and Token from the Tina dashboard</li>
            <li>Create a <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file with:
              <pre className="bg-gray-100 p-3 rounded mt-2 text-sm">
{`NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
TINA_TOKEN=your-token`}
              </pre>
            </li>
            <li>Restart your dev server</li>
          </ol>
          
          <p className="text-sm text-gray-600">
            Note: The free tier supports 2 users, which is perfect for you and your wife to edit content.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Alternative: Edit Locally</h2>
          <p className="mb-4">While we set up Tina Cloud, you can edit your content directly:</p>
          
          <div className="space-y-3">
            <a href="/articles" className="block bg-white p-4 rounded border hover:shadow-md transition">
              <h3 className="font-semibold">View Articles</h3>
              <p className="text-sm text-gray-600">Browse your published articles</p>
            </a>
            
            <a href="/projects" className="block bg-white p-4 rounded border hover:shadow-md transition">
              <h3 className="font-semibold">View Projects</h3>
              <p className="text-sm text-gray-600">Browse your project portfolio</p>
            </a>
            
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold">Edit Content Files</h3>
              <p className="text-sm text-gray-600">Edit markdown files in <code>/content/articles</code> and <code>/content/projects</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
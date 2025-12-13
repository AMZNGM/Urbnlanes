export default function OurProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900">Our Projects</h1>
              <p className="mt-2 text-gray-600">View all our projects</p>
              <div className="mt-6">
                <p className="text-sm text-gray-500">Projects page content</p>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800">Our Projects Overview</h2>
                <p className="mt-2 text-gray-600">
                  This page shows an overview of all our projects. Browse through our complete portfolio of developments.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-white rounded shadow">
                    <h3 className="font-semibold">Latest Launches</h3>
                    <p className="text-sm text-gray-600">View our newest projects</p>
                  </div>
                  <div className="p-4 bg-white rounded shadow">
                    <h3 className="font-semibold">Residential Projects</h3>
                    <p className="text-sm text-gray-600">Explore our residential developments</p>
                  </div>
                  <div className="p-4 bg-white rounded shadow">
                    <h3 className="font-semibold">Commercial Projects</h3>
                    <p className="text-sm text-gray-600">Discover our commercial properties</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { getRouteConfig } from '@/config/routes.config'

export default function YellowLanePage() {
  const routeConfig = getRouteConfig('/projects/yellow-lane')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900">{routeConfig.metadata.title}</h1>
              <p className="mt-2 text-gray-600">{routeConfig.metadata.description}</p>
              <div className="mt-6">
                <p className="text-sm text-gray-500">Permission: {routeConfig.permission}</p>
                <p className="text-sm text-gray-500">Cache Time: {routeConfig.metadata.cacheTime}s</p>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800">Yellow Lane Project Details</h2>
                <p className="mt-2 text-gray-600">
                  This is the Yellow Lane project page. Content for the Yellow Lane project will be displayed here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

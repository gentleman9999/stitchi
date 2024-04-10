import Skeleton from 'react-loading-skeleton'

const CatalogFiltersSidebarSkeleton = () => {
  return (
    <aside className="hidden lg:block w-64">
      <ul className="flex flex-col gap-10">
        {Array.from(new Array(5)).map((_, i) => (
          <li key={i}>
            <ul className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold mb-2">
                <Skeleton enableAnimation width="50%" />
              </h3>
              {Array.from(new Array(4)).map((_, i) => (
                <li key={i}>
                  <Skeleton enableAnimation width="60%" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default CatalogFiltersSidebarSkeleton

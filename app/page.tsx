import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import PropertyGrid from '@/components/PropertyGrid'

export default function Home() {
return (
<div className="min-h-screen bg-white">
<Header />
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="py-16">
<SearchBar />
</div>
<PropertyGrid />
</main>
</div>
)
}

const HomeWrapper = () => {

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome to the CRM Dashboard</h1>
                </div>
                <div className="flex items-center justify-center">
                    <div className="bg-blue-500 p-6 rounded-lg shadow-lg text-white hover:bg-blue-600 transition duration-300 ease-in-out">
                        <h2 className="text-xl font-semibold">CRM Dashboard</h2>
                        <p className="mt-4">Manage Leads.</p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default HomeWrapper;
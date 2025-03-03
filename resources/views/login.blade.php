<html>

<head>
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
    @include('errors')
    <section class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2">
            <div class="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div class="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl">
                        Sign in
                    </h2>
                    <p class="mt-2 text-sm text-gray-600">
                        Don&#x27;t have an account?
                        <a href="signup" title="" name="email"
                            class="font-semibold text-black transition-all duration-200 hover:underline">
                            Create a free account
                        </a>
                    </p>
                    <form class="mt-8" method="post" action="login">
                        @csrf
                        <div class="space-y-5">
                            <div>
                                <label for="" class="text-base font-medium text-gray-900">
                                    Email address
                                </label>
                                <div class="mt-2">
                                    <input
                                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email" name="email" placeholder="Email" value="user1@mail.com" />
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center justify-between">
                                    <label for="" class="text-base font-medium text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div class="mt-2">
                                    <input name="password"
                                        class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password" placeholder="Password" value="123" />
                                </div>
                            </div>
                            <div>
                                <button type="submit"
                                    class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                                    Login
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" class="ml-2">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="w-75 mx-auto">
                @include('login-img')
            </div>
        </div>
    </section>
</body>

</html>

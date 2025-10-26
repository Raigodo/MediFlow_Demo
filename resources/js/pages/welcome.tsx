import AppLayout from '@/layouts/app-layout';

function WelcomePage() {
    return (
        <AppLayout>
            <div className="mx-auto mt-8 text-center">
                <h1 className="text-3xl">Welcome!</h1>
                <a
                    className="cursor-pointer text-sm text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
                    href="https://docs.google.com/document/d/1CgOLZ3XHBs5Mk5OV8F2-OXMhEvu5sK1K70ndk4Bf8ss/edit?usp=sharing"
                    target="_blank"
                >
                    Readme
                </a>
            </div>
        </AppLayout>
    );
}

export default WelcomePage;

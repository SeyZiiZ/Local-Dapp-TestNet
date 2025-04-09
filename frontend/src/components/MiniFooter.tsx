export default function MiniFooter() {
    return (
        <div className="relative mt-12 text-center">
            <p className="text-sm text-white opacity-80">
                © {new Date().getFullYear()} Flora&Fauna. All rights reserved.
            </p>
        </div>
    )
}
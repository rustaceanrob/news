export default function({tag}) {
    return (
        <div className="flex pt-1 pb-1 pl-4 pl-4">
            <button type="button" className="bg-slate-400 border border-black rounded-2xl py-2 px-3 pl-4 pr-4 text-white">{tag}</button>
        </div>
    )
}
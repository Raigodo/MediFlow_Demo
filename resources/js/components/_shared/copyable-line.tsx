import CopyToClipboardButton from './copy-to-clipboard-button';

function CopyableLine({ value }: { value: string }) {
    return (
        <div className="relative flex h-fit min-h-6 items-center">
            <div className="pr-8">
                <div className="max-w-full truncate">{value}</div>
            </div>
            <div className="absolute top-0 right-0 bottom-0 flex items-center pb-0.5">
                <CopyToClipboardButton value={value} hint="Nokopēt" />
            </div>
        </div>
    );
}

export default CopyableLine;

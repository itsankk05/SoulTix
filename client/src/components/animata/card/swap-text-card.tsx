import SwapText from "../text/swap-text";

interface FlipTextCardProps {
  initialText: string;
  finalText: string;
  backgroundImage: string;
}

export default function SwapTextCard({
  initialText,
  finalText,
  backgroundImage,
}: FlipTextCardProps) {
  return (
    <div
      className="group flex flex-col justify-between rounded-3xl p-6 md:max-w-[500px]"
      style={{
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "300px",
        width: "300px",
      }}
    >
      <h5 className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
        Animata
      </h5>
      <div className="flex flex-col justify-between md:min-w-72">
        <div className="md:hidden">
          <div className="text-lg font-semibold text-black">{initialText}</div>
          <div className="text-sm font-medium text-gray-500">{finalText}</div>
        </div>
        <SwapText
          initialText={initialText}
          finalText={finalText}
          disableClick
          // Set min height so that all the text content fits
          // use -mb-7 to hide the extra space when not active
          className="-mb-7 hidden min-h-20 w-3/4 transition-all duration-200 group-hover:mb-0 md:flex md:flex-col"
          initialTextClassName="text-lg group-hover:opacity-0 h-full duration-200 font-semibold text-black"
          finalTextClassName="text-sm h-full duration-200 font-medium text-gray-500"
        />
      </div>
    </div>
  );
}

import { videoSource, VideoSourceProps } from "@/components/player-provider";
import { Dispatch, SetStateAction } from "react";

const ServerChoices = ({
	activeServer,
	setActiveServer,
}: {
	activeServer: VideoSourceProps;
	setActiveServer: Dispatch<SetStateAction<VideoSourceProps>>;
}) => {
	return (
		<div className="flex flex-col gap-3 py-5">
			<div className="flex gap-3 items-center">
				<p className="text-sm text-muted-foreground/60">Video Source</p>
				<div className="border-b border-muted-foreground/40 flex-1"></div>
			</div>
			<div className="flex gap-3 flex-wrap">
				{videoSource.map((item) => {
					if (!item.status) {
						return null;
					}
					return (
						<div
							key={item.server}
							data-server={
								item.server.toLowerCase() === activeServer.server.toLowerCase()
							}
							onClick={() => {
								setActiveServer(item);
							}}
							className="transition-all duration-200 cursor-pointer flex items-center gap-2 group outline outline-muted-foreground/20 text-muted-foreground/50 rounded-md py-1.5 p-3 bg-muted-foreground/10 hover:outline-muted-foreground/50 hover:text-muted-foreground/70 data-[server=true]:outline-primary data-[server=true]:text-primary data-[server=true]:outline-2 data-[server=true]:bg-accent/30"
						>
							<div className="size-2 rounded-full bg-muted-foreground/40 group-data-[server=true]:bg-primary group-hover:bg-muted-foreground/70 transition-all duration-200">
								<div className="size-2 rounded-full outline-1 animate-ping hidden group-data-[server=true]:block" />
							</div>
							<span className="inline text-sm">{item.server}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ServerChoices;

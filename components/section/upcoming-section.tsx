import { NextPage } from "next";
import { Button } from "../ui/button";
import { Bell, Dot, Plus } from "lucide-react";
import { useReleaseStatus } from "@/lib/hook";
import UpcomingCard from "../upcoming-card";

const upcomingData = [
	{
		adult: false,
		backdrop_path: "/diOZbaDnB2CIilwd0527AB1qMvW.jpg",
		genre_ids: [27, 53],
		id: 1339713,
		title: "Obsession",
		original_language: "en",
		original_title: "Obsession",
		overview:
			'After breaking the mysterious "One Wish Willow" to win his crush\'s heart, a hopeless romantic finds himself getting exactly what he asked for but soon discovers that some desires come at a dark, sinister price.',
		popularity: 738.4558,
		poster_path: "/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg",
		release_date: "2026-05-13",
		softcore: false,
		video: false,
		vote_average: 8.219,
		vote_count: 1953,
	},
	{
		adult: false,
		backdrop_path: "/mCpwRayjXMFzKHbjbzc5JRKfq1O.jpg",
		genre_ids: [27, 9648, 878],
		id: 1083381,
		title: "Backrooms",
		original_language: "en",
		original_title: "Backrooms",
		overview: "A strange doorway appears in the basement of a furniture showroom.",
		popularity: 549.6631,
		poster_path: "/rhGx6E3qRNMgj3i5su2oukNHwIQ.jpg",
		release_date: "2026-05-27",
		softcore: false,
		video: false,
		vote_average: 6.8,
		vote_count: 872,
	},
	{
		adult: false,
		backdrop_path: "/4D1pdB27uph7J8HQzNf8QvvH9bn.jpg",
		genre_ids: [16, 10751, 35, 12],
		id: 1084244,
		title: "Toy Story 5",
		original_language: "en",
		original_title: "Toy Story 5",
		overview:
			"When Bonnie receives a Lilypad tablet as a gift and becomes obsessed, Buzz, Woody, Jessie and the rest of the gang's jobs become exponentially harder when they have to go head to head with the all-new threat to playtime.",
		popularity: 510.8593,
		poster_path: "/sfQtVlIHljToOwYjhe21KPGzZWK.jpg",
		release_date: "2026-06-17",
		softcore: false,
		video: false,
		vote_average: 7.405,
		vote_count: 457,
	},
	{
		adult: false,
		backdrop_path: "/iYjlQzWbcFIjWe2WifbEPb4kErp.jpg",
		genre_ids: [27, 53],
		id: 1127384,
		title: "Deep Water",
		original_language: "en",
		original_title: "Deep Water",
		overview:
			"A group of international passengers on a flight from Los Angeles to Shanghai is forced to make an emergency landing in shark-infested waters. The terrified group is forced to work together and overcome their differences if they hope to escape their sinking plane and the frenzy of sharks drawn to the wreckage.",
		popularity: 276.9717,
		poster_path: "/kjcuS7xaRyqRjVaVcH4t0qHshuX.jpg",
		release_date: "2026-04-30",
		softcore: false,
		video: false,
		vote_average: 6.725,
		vote_count: 109,
	},
	{
		adult: false,
		backdrop_path: "/xMoXsOgF0hBP7iVj7ZPIrFtTeL3.jpg",
		genre_ids: [12, 16, 35, 10751, 14],
		id: 1315772,
		title: "Minions & Monsters",
		original_language: "en",
		original_title: "Minions & Monsters",
		overview:
			"This is the rambunctious, ridiculous and totally true story of how the Minions conquered Hollywood, became movie stars, lost everything, unleashed monsters onto the world and then banded together to try and save the planet from the mayhem they had just created.",
		popularity: 201.3444,
		poster_path: "/sO3O1szSYuXLwtkobU5TExQ6Wfa.jpg",
		release_date: "2026-06-24",
		softcore: false,
		video: false,
		vote_average: 6.7,
		vote_count: 90,
	},
	{
		adult: false,
		backdrop_path: "/sS3zGYFPcfM5pArVNWl6qLyaSmU.jpg",
		genre_ids: [16, 28, 12, 14],
		id: 980431,
		title: "Avatar Aang: The Last Airbender",
		original_language: "en",
		original_title: "Avatar Aang: The Last Airbender",
		overview:
			"Avatar Aang, the world's last Airbender, learns of an ancient power that could save his culture from extinction. With the help of his friends, he embarks on a global quest to find it before it falls into the wrong hands and threatens to upend the peace they sacrificed everything to achieve.",
		popularity: 120.8989,
		poster_path: "/29Jdsak3SrwGds5k1t43kH6Khed.jpg",
		release_date: "2026-07-25",
		softcore: false,
		video: false,
		vote_average: 0,
		vote_count: 0,
	},
	{
		adult: false,
		backdrop_path: "/ew3EqF9VLTxmK64OsHT7p7lr4wT.jpg",
		genre_ids: [28, 80],
		id: 1280738,
		title: "The Furious",
		original_language: "en",
		original_title: "火遮眼",
		overview:
			"After Wang Wei's daughter is kidnapped by a criminal network and he receives no help from the corrupt police, Wei sets out to find her himself. His only ally is Navin, a relentless journalist whose wife has mysteriously disappeared. Fueled by a furious vengeance, the unlikely duo ruthlessly battle the kidnappers in this explosive martial arts showdown.",
		popularity: 110.8123,
		poster_path: "/zP19YO60jwEsfKd5Qf1UvA5uJu8.jpg",
		release_date: "2026-06-10",
		softcore: false,
		video: false,
		vote_average: 7.7,
		vote_count: 70,
	},
	{
		adult: false,
		backdrop_path: "/5glivQffWJkRJttJ5g5LW14kmeC.jpg",
		genre_ids: [878, 28, 12],
		id: 969681,
		title: "Spider-Man: Brand New Day",
		original_language: "en",
		original_title: "Spider-Man: Brand New Day",
		overview:
			"Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control. But that transformation might also be the only thing that can stop a shocking new threat to the city and those he loves - a powerful villain no one can even see.",
		popularity: 87.1957,
		poster_path: "/yyB2VJEW3an2xCdcYCPQhn9QERR.jpg",
		release_date: "2026-07-29",
		softcore: false,
		video: false,
		vote_average: 0,
		vote_count: 0,
	},
	{
		adult: false,
		backdrop_path: "/m3Pom6pbD51bBv3syz8NMHda3fz.jpg",
		genre_ids: [12, 28, 14],
		id: 1368337,
		title: "The Odyssey",
		original_language: "en",
		original_title: "The Odyssey",
		overview:
			"Odysseus, the legendary King of Ithaca, embarks on a long and perilous journey home following the Trojan War. Throughout his voyage, he is forced to confront the whims of gods, mythological monsters, and trials that stretch both his cunning and his humanity to the breaking point.",
		popularity: 65.105,
		poster_path: "/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg",
		release_date: "2026-07-15",
		softcore: false,
		video: false,
		vote_average: 0,
		vote_count: 0,
	},
	{
		adult: false,
		backdrop_path: "/qY7zVZ7liULhfRoXg4c9Xl83LcR.jpg",
		genre_ids: [27],
		id: 1430077,
		title: "Hokum",
		original_language: "en",
		original_title: "Hokum",
		overview:
			"When novelist Ohm Bauman retreats to a remote inn to scatter his parents' ashes, he is consumed by tales of a witch haunting the honeymoon suite. Disturbing visions and a shocking disappearance forces him to confront dark corners of his past.",
		popularity: 50.3826,
		poster_path: "/jKPWwsbAM6HKURPYQ1eG8DmKMKn.jpg",
		release_date: "2026-04-29",
		softcore: false,
		video: false,
		vote_average: 6.89,
		vote_count: 465,
	},
];

export interface Movie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	title: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	softcore: boolean;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

const UpcomingSection = ({}) => {
	return (
		<section className="p-5 container mx-auto">
			<div className="flex gap-3 flex-col w-full">
				<h6 className="section-title">Upcoming Releases</h6>
				<div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mx-auto font-medium">
					<UpcomingCard items={upcomingData} />
				</div>
			</div>
		</section>
	);
};

export default UpcomingSection;

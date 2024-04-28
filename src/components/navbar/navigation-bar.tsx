import ThemeToggler from "@/components/templates/theme-toggler";
import { usePolkadot } from "@/context";
import { truncateWalletAddress } from '@/utils';
import Button from '@/utils/button';
import { Menu } from '@headlessui/react';
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { AiFillWallet } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa6';
import LogoImage from "../../../public/logo/commune.gif";
import classes from './navigation-bar.module.css';


export default function NavigationBar() {


	const { isInitialized, handleConnect, selectedAccount } = usePolkadot()

	return (
		<>
		<div className="fixed top-0 left-0 w-full dark:bg-gray-800 shadow-md opacity-95 bg-gray-100 py-4 dark:text-white z-10">
			<div className="min-h-full">
				<div className="mx-auto px-4 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center">
							<Link className={classes.brand} href="/">
								<Image
									style={{ width: "auto", height: "4rem", marginRight: "-0.25rem" }}
									src={LogoImage}
									alt="Commune Logo"
									width={64}
									height={64}
								/>
							</Link>

							<div className="hidden xl:block">
								<div className="flex">
									<a
										className={classNames(classes.link, 'dark:text-white dark:hover:text-[#25c2a0] p-0 lg:pl-4')}
										aria-current={'page'}
									>
										<span className='flex items-center justify-center'>
											Com Trading Bot
										</span>
									</a>
								</div>
							</div>
						</div>

						<div className="hidden md:block">
							<div className="flex items-center relative">

								<ThemeToggler />

								<Menu as="div" className="flex ml-3">
									<div>
										<Menu.Button style={{ marginLeft: '0.35rem' }} className="text-black dark:text-white dark:hover:text-[#25c2a0] p-0 shadow-md dark:bg-[#4a90e2] bg-[#4a90e2] hover:bg-[#357bd8] rounded-lg px-4 py-2">Choose wallet</Menu.Button>
									</div>

									<Menu.Items className="dark:bg-dark bg-green-700 dark:text-white  absolute right-0 z-20 mt-10 w-[12.5rem] origin-top-right py-1 px-5 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex items-start justify-center flex-col rounded-3xl">
										<Menu.Item>
											{
												isInitialized && selectedAccount ? (
													<div className="flex items-center">

														<div className="relative flex items-center bg-white rounded-full shadow px-4 py-2">
															<button className="flex items-center cursor-pointer">
																<AiFillWallet size={24} className="text-purple dark:text-black" />
																<span className="ml-2 font-mono dark:text-black">
																	{truncateWalletAddress(selectedAccount.address)}
																</span>
															</button>
														</div>
													</div>
												) : (
													<div className="flex items-center gap-x-2 w-full">
														{!isInitialized && <FaSpinner className="spinner" />}
														<Button
															size="large"
															variant="primary"
															className='flex items-center justify-center'
															onClick={handleConnect}
															isDisabled={!isInitialized}
														>
															Connect with Polkadot
														</Button>
													</div>
												)
											}
										</Menu.Item>

										<Menu.Item>
											<button>
												connect
											</button>
										</Menu.Item>
									</Menu.Items>
								</Menu>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
		</>
	)
}

"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { HeroBlok, IframeBlok } from "@/types/storyblok";
import IframeComponent from "./IframeComponent";
import Image from "next/image";
import CurvedBackground from "../../ui/CurvedBackground";
import { StoryblokComponent } from "@storyblok/react";
import Button from "../general/Button";
import Iframe from "../general/Iframe";

export default function Hero({ blok }: { blok: HeroBlok }) {
  console.log(blok);
  return (
    <section
      {...storyblokEditable(blok)}
      className="relative w-full bg-white overflow-hidden transition-all duration-500 ease-in-out"
    >
      {/* CurvedBackground with Hero image from Storyblok - Hidden on mobile, visible on larger screens */}
      <div className="hidden md:block">
        <CurvedBackground 
          backgroundImage={blok?.hero_image?.filename || ""}
          width="80%"
          height="90%"
          className=" absolute inset-0 hidden md:block "
          opacity={0.9}
        />
      </div>
      <div className="relative w-full max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 transition-all duration-500 ease-in-out">
        
        {/* Mobile Layout - No card container, centered content */}
        <div className="block md:hidden">
          <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
            {/* H1 Title - Mobile centered */}
            <h1 
              className="text-3xl sm:text-4xl font-light leading-tight tracking-wide transition-all duration-300 hover:text-gray-700 max-w-4xl"
              style={{
                fontFamily: "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "300",
                color: "rgba(50,84,109,1)"
              }}
            >
              {blok?.headline || "H1 Plan je ketelonderhoud"}
            </h1>

            {/* Body Text - Mobile centered */}
            <p 
              className="text-base sm:text-lg leading-relaxed transition-opacity duration-300 hover:opacity-90 max-w-2xl"
              style={{
                fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                fontWeight: "300",
                color: "rgba(0,0,0,1)"
              }}
            >
              {blok?.description || "Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text"}
            </p>

            {/* CTA Button - Mobile centered */}
            <div className="pt-2">
             <div className="pt-2">
                
                  <Button
                    blok={blok?.primary_button?.[0]}
                    className=" inline-flex items-center justify-center px-10 py-8 rounded-xl text-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                  />
                </div>
            </div>

            {/* Trust Badges - Mobile stacked */}
            <div className="flex flex-col gap-4 pt-4 w-full max-w-md">
              {blok?.trust_badges?.map((badge, index) => (
                <div key={index} className="relative min-h-[70px] transition-all duration-300 hover:scale-[1.02]">
                  <div 
                    className="absolute inset-0 rounded-2xl transition-all duration-300"
                    style={{
                      background: "rgba(244, 244, 244, 0.8)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                    }}
                  />
                  <div className="relative flex items-center h-full px-4 py-3">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-none mr-3 relative flex-shrink-0">
                      {badge.icon_svg ? (
                        <div 
                          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-7"
                          dangerouslySetInnerHTML={{ __html: badge.icon_svg }}
                        />
                      ) : badge.icon?.filename ? (
                        <Image
                          src={badge.icon.filename}
                          alt={badge.icon.alt || 'Trust badge icon'}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#AF1B3C] rounded-full" />
                      )}
                    </div>
                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <div 
                        className="text-base font-medium leading-tight transition-colors duration-300"
                        style={{
                          fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: "500",
                          color: "rgba(175,27,60,1)"
                        }}
                      >
                        {badge.value}
                      </div>
                      <div 
                        className="text-sm leading-tight transition-colors duration-300"
                        style={{
                          fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: "300",
                          color: "rgba(50,84,109,1)"
                        }}
                      >
                        {badge.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Iframe Component - Mobile */}
            <div className="w-full max-w-sm pt-6">
              {blok?.iframe_block ? (
                <div 
                  className="w-full aspect-[3/4] rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  style={{
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)"
                  }}
                >
                  <StoryblokComponent blok={blok.iframe_block?.[0] as IframeBlok} />
                </div>
              ) : (
                <div 
                  className="w-full aspect-[3/4] rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  style={{
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)"
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center p-6">
                    <span 
                      className="text-2xl font-light text-center transition-colors duration-300"
                      style={{
                        fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                        fontWeight: "300",
                        color: "rgba(0,0,0,0.7)"
                      }}
                    >
                      Iframe
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout - With card container */}
        <div className="hidden md:block">
          {/* Semi-transparent Background Card */}
          <div 
            className="rounded-3xl p-8 lg:p-12 xl:p-16 w-full transition-all duration-500 ease-in-out hover:shadow-2xl"
            style={{
              background: "rgba(244, 244, 244, 0.50)",
              boxShadow: "-5px 7px 17px -2px rgba(0, 0, 0, 0.59)",
            //   backdropFilter: "blur(10px)"
            }}
          >
            {/* Content Layout */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

              {/* Left Content */}
              <div className="flex flex-col justify-around h-full">
                {/* H1 Title */}
                <h1 
                  className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-light leading-tight tracking-wide transition-all duration-300 hover:text-gray-700"
                  style={{
                    fontFamily: "BelfiusAlternative, -apple-system, Roboto, Helvetica, sans-serif",
                    
                    color: "rgba(50,84,109,1)"
                  }}
                >
                  {blok?.headline || "H1 Plan je ketelonderhoud"}
                </h1>

                {/* Body Text */}
                <p 
                  className="text-base lg:text-lg leading-relaxed transition-opacity duration-300 hover:opacity-90"
                  style={{
                    fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                    fontWeight: "300",
                    color: "rgba(0,0,0,1)"
                  }}
                >
                  {blok?.description || "Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text Body text"}
                </p>

                {/* CTA Button */}
                <div className="pt-2">
                
                  <Button
                    blok={blok?.primary_button?.[0]}
                    className=" inline-flex items-center justify-center px-10 py-8 rounded-xl text-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                  />
                </div>

                {/* Trust Badges Container */}
               <div className="flex flex-wrap flex-col  md:flex-nowrap gap-4 md:gap-6 lg:flex-row md:pt-6 w-full max-w-2xl">

            
              {blok?.trust_badges?.slice(0, 2).map((badge, index) => (
              
                <div key={index} className="relative transition-all duration-300 hover:scale-[1.02]" style={{ maxWidth: "300px", height: "83px" }}>
                  <div
                    className="absolute inset-0 rounded-3xl transition-all duration-300"
                    style={{
                      background: "#F4F4F4",
                      boxShadow: "-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)",
                      opacity: "0.5"
                    }}
                  />
                  <div className="relative flex items-center h-full px-6">
                    <div className="w-14 h-14 rounded-none mr-4 relative flex-shrink-0">
                      {badge.icon_svg ? (
                        <div
                          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
                          dangerouslySetInnerHTML={{ __html: badge.icon_svg }}
                        />
                      ) : badge.icon?.filename ? (
                        <Image
                          src={badge.icon.filename}
                          alt={badge.icon.alt || 'Trust badge icon'}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-300 rounded-none flex items-center justify-center">
                          <div className="w-8 h-8 bg-[#AF1B3C] rounded-full" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className="leading-tight transition-colors duration-300"
                        style={{
                          fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: "600",
                          fontSize: "24px",
                          color: "#AF1B3C"
                        }}
                      >
                        {badge.value || (index === 0 ? "197.432" : "4.5")}
                      </div>
                      <div
                        className="leading-tight transition-colors duration-300"
                        style={{
                          fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                          fontWeight: "300",
                          fontSize: "14px",
                          color: "#32546D"
                        }}
                      >
                        {badge.description || (index === 0 ? "Projets réalisés" : "Taux de satisfaction")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Fallback trust badges if none provided */}
              {(!blok?.trust_badges || blok.trust_badges.length === 0) && (
                <>
                  <div className="relative transition-all duration-300 hover:scale-[1.02]" style={{ width: "300px", height: "83px" }}>
                    <div
                      className="absolute inset-0 rounded-3xl transition-all duration-300"
                      style={{
                        background: "#F4F4F4",
                        boxShadow: "-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)",
                        opacity: "0.5"
                      }}
                    />
                    <div className="relative flex items-center h-full px-6">
                      <div className="w-14 h-14 bg-gray-300 rounded-none mr-4 flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#AF1B3C] rounded-full" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          style={{
                            fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: "600",
                            fontSize: "24px",
                            color: "#AF1B3C"
                          }}
                        >
                         --
                        </div>
                        <div
                          style={{
                            fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: "300",
                            fontSize: "14px",
                            color: "#32546D"
                          }}
                        >
                          Projets réalisés
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative transition-all duration-300 hover:scale-[1.02]" style={{ width: "300px", height: "83px" }}>
                    <div
                      className="absolute inset-0 rounded-3xl transition-all duration-300"
                      style={{
                        background: "#F4F4F4",
                        boxShadow: "-5px 7px 17.3px -2px rgba(0, 0, 0, 0.59)",
                        opacity: "0.5"
                      }}
                    />
                    <div className="relative flex items-center h-full px-6">
                      <div className="w-14 h-14 bg-gray-300 rounded-none mr-4 flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#AF1B3C] rounded-full" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          style={{
                            fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: "600",
                            fontSize: "24px",
                            color: "#AF1B3C"
                          }}
                        >
                       --
                        </div>
                        <div
                          style={{
                            fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: "300",
                            fontSize: "14px",
                            color: "#32546D"
                          }}
                        >
                          Taux de satisfaction
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
              </div>

              {/* Right Content - Iframe Component */}
              <div className="flex justify-center lg:justify-end items-center">
                {blok?.iframe_block ? (
                  <div className="w-full h-full flex justify-center max-w-md lg:max-w-lg aspect-[3/4]">
                    
                      {/* <StoryblokComponent blok={blok.iframe_block?.[0] as IframeBlok} /> */}
                      <Iframe blok={blok.iframe_block?.[0] } />
                    </div>
                
                ) : (
                  <div className="w-full max-w-md lg:max-w-lg aspect-[3/4]">
                    <div 
                      className="w-full h-full rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                      style={{
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)"
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center p-6 lg:p-8">
                        <span 
                          className="text-2xl lg:text-3xl xl:text-4xl font-light leading-normal text-center transition-colors duration-300"
                          style={{
                            fontFamily: "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
                            fontWeight: "300",
                            color: "rgba(0,0,0,0.7)"
                          }}
                        >
                          Iframe
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
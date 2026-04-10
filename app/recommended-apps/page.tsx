"use client";

// Added FolderOpen for the new section
import { Download, Youtube, Send, ExternalLink, FolderOpen } from "lucide-react";
import {
  recommendedApps,
  recommendedChannels,
  recommendedBots,
  recommendedDriveFolders, // Import the new array
} from "@/lib/constants/recommendedData";

export default function RecommendedAppsPage() {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    deepLink: string,
    fallbackUrl: string,
  ) => {
    e.preventDefault();
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    if (isMobile) {
      // eslint-disable-next-line react-hooks/immutability
      window.location.href = deepLink;
      setTimeout(() => {
        window.open(fallbackUrl, "_blank");
      }, 1500);
    } else {
      window.open(fallbackUrl, "_blank");
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 mt-4 bg-[#fdfbf7] dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold font-amiri text-slate-800 dark:text-slate-100">
            تطبيقات موصى بها
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            مجموعة منتقاة بعناية من التطبيقات، القنوات، والبوتات التي تعينك على
            طلب العلم وتنظيم وقتك.
          </p>
        </div>

        <div className="space-y-12">
          {recommendedApps.map((category) => (
            <section key={category.id} className="space-y-6">
              <h2 className="text-2xl font-bold font-amiri flex items-center gap-3 text-amber-700 dark:text-amber-500 border-b border-amber-200 dark:border-slate-800 pb-3">
                {category.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.apps.map((app) => {
                  const IconComponent = app.icon;
                  return (
                    <div
                      key={app.id}
                      className="group flex flex-col bg-white dark:bg-slate-800/80 rounded-3xl p-6 shadow-sm hover:shadow-md dark:shadow-none border border-transparent dark:border-slate-700/50 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-amber-50 text-amber-700 dark:bg-slate-700 dark:text-amber-400 group-hover:bg-amber-100 dark:group-hover:bg-slate-600 transition-colors">
                          <IconComponent size={28} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                            {app.name}
                          </h3>
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 dark:text-slate-400 grow leading-relaxed mb-6">
                        {app.description}
                      </p>

                      <a
                        href={app.fallbackUrl}
                        onClick={(e) =>
                          handleLinkClick(e, app.deepLink, app.fallbackUrl)
                        }
                        className="mt-auto flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-full font-medium transition-all bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white dark:bg-slate-700/80 dark:text-amber-400 dark:hover:bg-amber-500 dark:hover:text-slate-900 active:scale-[0.98]"
                      >
                        <Download size={18} />
                        <span>تحميل التطبيق</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Unified Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8 border-t-2 border-dashed border-slate-200 dark:border-slate-800">
          
          {/* Left Column: YouTube */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-red-200 dark:border-slate-800 pb-3">
              <Youtube className="text-red-600 dark:text-red-500" size={32} />
              <h2 className="text-2xl font-bold font-amiri text-slate-800 dark:text-slate-200">
                قنوات يوتيوب
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedChannels.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800/80 shadow-sm border border-slate-100 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-500/50 transition-colors group"
                >
                  <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {channel.name}
                  </span>
                  <ExternalLink
                    size={18}
                    className="text-slate-400 group-hover:text-red-500 transition-colors"
                  />
                </a>
              ))}
            </div>
          </section>

          {/* Right Column: Split into Bots and Drive */}
          <div className="space-y-12">
            
            {/* Telegram Bots */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-blue-200 dark:border-slate-800 pb-3">
                <Send className="text-blue-500 dark:text-blue-400" size={30} />
                <h2 className="text-2xl font-bold font-amiri text-slate-800 dark:text-slate-200">
                  بوتات تيليجرام خدمية
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {recommendedBots.map((bot) => (
                  <a
                    key={bot.id}
                    href={bot.fallbackUrl}
                    onClick={(e) =>
                      handleLinkClick(e, bot.deepLink, bot.fallbackUrl)
                    }
                    className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-800/80 shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {bot.name}
                      </span>
                      <ExternalLink
                        size={18}
                        className="text-slate-400 group-hover:text-blue-500 transition-colors"
                      />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {bot.description}
                    </p>
                  </a>
                ))}
              </div>
            </section>

            {/* Google Drive Resources */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-emerald-200 dark:border-slate-800 pb-3">
                <FolderOpen className="text-emerald-500 dark:text-emerald-400" size={30} />
                <h2 className="text-2xl font-bold font-amiri text-slate-800 dark:text-slate-200">
                  جوجل درايف
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {recommendedDriveFolders.map((folder) => (
                  <a
                    key={folder.id}
                    href={folder.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-800/80 shadow-sm border border-slate-100 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {folder.name}
                      </span>
                      <ExternalLink
                        size={18}
                        className="text-slate-400 group-hover:text-emerald-500 transition-colors"
                      />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {folder.description}
                    </p>
                  </a>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
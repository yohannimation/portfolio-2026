export interface PagesInterface {
    name: React.ReactNode,
    url: string,
    pageKey: PageKeyInterface,
}

type PageKeyInterface = "home" | "web" | "audiovisual" | "about-me";
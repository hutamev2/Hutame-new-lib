# Hutame-new-lib

Obsidian tabanlı Roblox/Luau UI kütüphanesi. İlk sürüm mevcut API ve görünümü korur; Hutame dağıtım adreslerini, pencere adını ve ayrı ayar klasörünü kullanır.

## Executor ile örnek arayüz

```lua
loadstring(game:HttpGet("https://raw.githubusercontent.com/hutamev2/Hutame-new-lib/main/Example.lua"))()
```

## Kendi arayüzünü oluştur

```lua
local Library = loadstring(game:HttpGet("https://raw.githubusercontent.com/hutamev2/Hutame-new-lib/main/Library.lua"))()
local Window = Library:CreateWindow({ Title = "Hutame UI", Footer = "v0.1.0", AutoShow = true, Center = true })
local Main = Window:AddTab("Main", "home")
local Group = Main:AddLeftGroupbox("Controls")
Group:AddToggle("ExampleToggle", { Text = "Example", Default = false })
Library.Toggles.ExampleToggle:OnChanged(function(Value)
    print("Example:", Value)
end)
```

`Library.lua` kütüphane nesnesi döndürür; tek başına pencere oluşturmaz. Hazır arayüz için `Example.lua` çalıştır. Varsayılan menü tuşu RightControl.

Executor tarafında `game:HttpGet` ve `loadstring` gerekir. Dosya tabanlı ayarlar için executor dosya işlevleri gerekir. Kaynakta Molto ve lucide-roblox-direct harici çalışma zamanı bağımlılıkları korunmuştur; bağlantı erişimi gerekir. Tüm executorlarla uyumluluk ve canlı Roblox testi henüz doğrulanmadı.

API örnekleri `Example.lua` içinde. Temel API belgeleri: https://docs.mspaint.cc/obsidian

## Kaynak ve lisans

Kaynak: [deividcomsono/Obsidian](https://github.com/deividcomsono/Obsidian). MIT lisansı ve orijinal telif bildirimi `LICENSE` içinde korunur. Kaynak kod sahibinin izniyle bağımsız proje olarak geliştirilmektedir.

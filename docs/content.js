const loader = `local Library = loadstring(game:HttpGet(
    "https://raw.githubusercontent.com/hutamev2/Hutame-new-lib/main/Library.lua?v=" .. os.time()
))()`;
const setup = `local Window = Library:CreateWindow({
    Title = "Hutame UI",
    Footer = "Made with Hutame",
    Center = true,
    AutoShow = true,
    Resizable = true,
})

local Tab = Window:AddTab("Genel", "settings")
local Group = Tab:AddLeftGroupbox("Tercihler")`;
const section = (id,title,body,code) => ({id,title,body,code});
const pages = [
{id:'overview',group:'Başlangıç',icon:'◈',title:'Genel bakış',desc:'Luau arayüzlerini daha az kodla oluştur. Kurulumdan state yönetimine kadar ihtiyacın olan her şey.',sections:[
section('approach','Bir fikirden çalışan arayüze','Pencereyi oluştur, bileşenlerini yerleştir ve davranışlarını bağla. Hutame UI; sekmeler, grup kutuları ve ortak bir state API’si ile arayüzünü düzenlemeni sağlar.'),
section('start','İlk arayüzün, birkaç satırda','Aşağıdaki örnek kütüphaneyi yükler, bir pencere açar ve ilk anahtarı oluşturur. Kod Roblox/Luau ortamında çalışır.',`${loader}\n\n${setup}\n\nGroup:AddToggle("Notifications", {\n    Text = "Bildirimler",\n    Default = true,\n    Callback = function(enabled)\n        print("Bildirimler:", enabled)\n    end,\n})`),
section('explore','İhtiyacın olan yerden başla','Her rehber; çalışan bir örnek, veri modeli ve dikkat edilmesi gereken davranışları birlikte ele alır.') ]},
{id:'installation',group:'Başlangıç',icon:'↓',title:'Kurulum',desc:'Tek bir kaynak dosyası. İlk pencereye kadar açık ve kısa bir yol.',sections:[
section('requirements','Çalışma ortamı','Bu dağıtım Roblox/Luau içindir. Aşağıdaki yükleme yöntemi <code>game:HttpGet</code> ve <code>loadstring</code> sunan bir ortam gerektirir; standart Studio LocalScript içinde doğrudan çalışmaz. Tarayıcı önizlemeleri yalnızca etkileşim simülasyonudur. Kaynak, ikon/font tarafında harici kaynaklara da erişebilir.'),
section('load','01 / Kütüphaneyi yükle','Dönen tabloyu <code>Library</code> değişkenine al. Diğer örneklerde bu değişkenin hazır olduğu varsayılır.',loader),
section('window','02 / Pencereyi oluştur','Bir pencere, bir sekme ve bileşenlerin yerleşeceği grup kutusunu oluştur. Devam eden örneklerde <code>Group</code> bu kutuyu ifade eder.',setup),
section('first','03 / İlk kontrolü ekle','Bileşen kimlikleri benzersiz olmalı. Aynı kimliği yeniden kullanmak kayıt tablosunda eski referansın üzerine yazabilir.',`Group:AddToggle("Welcome", {\n    Text = "Karşılama mesajı",\n    Default = false,\n    Callback = function(value)\n        print("Yeni değer:", value)\n    end,\n})`),
section('pin','Sürümü sabitle','<code>main</code> adresi en son kodu getirir. Tekrarlanabilir dağıtım için URL’deki <code>main</code> bölümünü test ettiğin tam commit SHA’sı ile değiştir. Kütüphaneyi yalnız bir kez yükleyip dönen referansı paylaş.') ]},
{id:'usage',group:'Başlangıç',icon:'⌘',title:'Temel kullanım',desc:'Pencere → sekme → grup → bileşen. Arayüzün yapısını sade tut.',sections:[
section('hierarchy','Yerleşim hiyerarşisi','<code>CreateWindow</code> ana pencereyi, <code>AddTab</code> sekmeyi, <code>AddLeftGroupbox</code> ve <code>AddRightGroupbox</code> iki sütundaki grupları oluşturur.',`${setup}\nlocal Appearance = Tab:AddRightGroupbox("Görünüm")\nAppearance:AddLabel("Görünüm tercihlerini burada düzenle.")`),
section('ids','Kimlik ve görünen metin','<code>"Notifications"</code> programatik kimliktir; <code>Text</code> kullanıcıya görünen etikettir. Etiketi değiştirdiğinde kimliği sabit bırak. Toggle’lara <code>Library.Toggles</code>, diğer değer kontrollerine <code>Library.Options</code> üzerinden eriş.',`local Toggle = Group:AddToggle("Notifications", {\n    Text = "Bildirimleri göster",\n    Default = false,\n})\n\nToggle:SetValue(true)\nprint(Library.Toggles.Notifications.Value)`),
section('lifecycle','Yaşam döngüsü ve temizleme','Kendi oluşturduğun event bağlantılarını kütüphanenin unload aşamasında kapat. <code>Library:Unload()</code> arayüzü kaldırırken bu temizleme işlevini de çağırır.',`local connection = game:GetService("RunService").Heartbeat:Connect(function(dt)\n    -- Uygulamanın güncelleme işlemleri\nend)\n\nLibrary:OnUnload(function()\n    connection:Disconnect()\nend)\n\nGroup:AddButton({\n    Text = "Arayüzü kapat",\n    Func = function()\n        Library:Unload()\n    end,\n})`),
section('single-instance','Tek instance davranışı','Library.lua tekrar çalıştırıldığında önceki Hutame UI instance’ı otomatik olarak <code>Unload()</code> edilir. Eski bağlantılar ve GUI temizlendikten sonra yeni kütüphane açılır; aynı scripti yeniden execute etmek üst üste iki menü oluşturmaz.') ]},
{id:'toggle',group:'Bileşenler',icon:'⊷',title:'Toggle',desc:'İki durum, tek bir kontrol. Boolean state’i oluştur, oku ve güvenli biçimde güncelle.',demo:true,props:[['Text','string','"Toggle"','Görünen etiket'],['Default','boolean','false','Başlangıç değeri'],['Callback','function','boş işlev','Değişim işleyicisi'],['Disabled','boolean','false','Kullanıcı etkileşimini kapatır'],['Visible','boolean','true','Görünürlüğü belirler'],['Risky','boolean','false','Riskli işlem vurgusu']],sections:[
section('create','01 / Toggle oluştur','Önce Kurulum rehberindeki <code>Library</code> ve <code>Group</code> değişkenlerini oluştur. Sonra benzersiz bir kimlikle anahtarı ekle. Dönen nesne, state ve kontrol yöntemlerini taşır.',`local Notifications = Group:AddToggle("Notifications", {\n    Text = "Bildirimler",\n    Default = false,\n    Callback = function(enabled)\n        print("Bildirimler açık mı?", enabled)\n    end,\n})`),
section('state','02 / State’i oku ve değiştir','Güncel değer <code>Value</code> alanındadır. Görünüm ve bağımlılıkların da güncellenmesi için doğrudan <code>Value</code> atamak yerine <code>SetValue</code> kullan. Bu yöntem callback’i de çağırabilir; aynı değeri vermek sessiz güncelleme garantisi sağlamaz.',`print(Notifications.Value)\nNotifications:SetValue(true)\nNotifications:SetValue(not Notifications.Value)`),
section('listen','03 / Değişime tepki ver','<code>OnChanged</code> sonradan bir işleyici bağlar. Abonelik listesi değildir: tekrar çağırırsan önceki OnChanged işlevini değiştirir. Callback ile OnChanged birlikte tanımlanırsa ikisi de çağrılır. OnChanged kaydı başlangıç değerini kendiliğinden işlemez.',`local function applyNotifications(enabled)\n    print("Uygulama durumu:", enabled)\nend\n\nNotifications:OnChanged(applyNotifications)\napplyNotifications(Notifications.Value) -- İlk durumu açıkça uygula`),
section('disabled','04 / Kullanılabilirliği yönet','<code>SetDisabled(true)</code> kullanıcı etkileşimini kapatır. Kaynakta SetValue hâlâ değeri/görünümü günceller; disabled durumunda RunChanged callback’leri çalıştırmaz. Devre dışı bırakmak state’i sıfırlamaz.',`Notifications:SetDisabled(true)\nNotifications:SetDisabled(false)\nNotifications:SetVisible(false)\nNotifications:SetVisible(true)`),
section('pitfalls','Tekrar eden callback’lerden kaçın','Callback’in içinde aynı Toggle üzerinde koşulsuz <code>SetValue</code> çağırma; bu tekrar callback tetikleyebilir. Değişimi tek bir uygulama işlevine yönlendir ve gerekiyorsa mevcut değeri kontrol et. Uzun işlemleri callback içinde bloklama; kendi iptal/temizleme mantığınla yönet.') ]},
{id:'slider',group:'Bileşenler',icon:'≡',title:'Slider',desc:'Sınırları belli sayısal değerler için akıcı ve okunur bir kontrol.',props:[['Min / Max','number','0 / 100','Alt ve üst sınır'],['Default','number','0','Başlangıç değeri'],['Rounding','number','0','Ondalık basamak sayısı'],['Suffix','string','""','Değerin sonuna eklenen birim']],sections:[
section('create','Slider oluştur','Aralığı ve başlangıç değerini birlikte tanımla. <code>Rounding = 0</code> tam sayı hassasiyeti verir.',`local Volume = Group:AddSlider("Volume", {\n    Text = "Ses seviyesi",\n    Default = 65,\n    Min = 0,\n    Max = 100,\n    Rounding = 0,\n    Suffix = "%",\n    Callback = function(value)\n        print("Ses:", value / 100)\n    end,\n})`),
section('update','Değeri güncelle','<code>SetValue</code> sayısal girdiyi aralık içinde tutar. <code>Value</code> üzerinden güncel değeri okuyabilirsin. Sürükleme sırasında sık callback gelebileceği için pahalı işlemleri her güncellemede başlatma.',`Volume:SetValue(40)\nprint(Library.Options.Volume.Value)`) ]},
{id:'dropdown',group:'Bileşenler',icon:'⌄',title:'Dropdown',desc:'Tek seçim veya çoklu seçim. Değer listesini ve seçili state’i ayrı yönet.',sections:[
section('single','Tek seçim','<code>Values</code> seçenekleri, <code>Default</code> başlangıç seçimini belirler. Aşağıdaki 1 değeri ilk seçeneğin indeksidir.',`local Quality = Group:AddDropdown("Quality", {\n    Text = "Görüntü kalitesi",\n    Values = { "Düşük", "Dengeli", "Yüksek" },\n    Default = 2,\n    Multi = false,\n    Callback = function(value)\n        print("Kalite:", value)\n    end,\n})\nQuality:SetValue("Yüksek")`),
section('multi','Çoklu seçim','<code>Multi = true</code> olduğunda Value bir seçim tablosudur: seçenek adı anahtar, seçilme durumu boolean değeridir. Diziyi değil bu haritayı okuyarak işlem yap.',`local Layers = Group:AddDropdown("Layers", {\n    Text = "Katmanlar",\n    Values = { "Etiketler", "İkonlar", "Açıklamalar" },\n    Multi = true,\n    Default = { "Etiketler" },\n    Callback = function(selected)\n        print("Etiketler:", selected["Etiketler"] == true)\n    end,\n})\nLayers:SetValue({ ["Etiketler"] = true, ["İkonlar"] = true })`),
section('options','Seçenekleri yenile','Seçenek kaynağı değiştiğinde listeyi yenile, ardından açıkça geçerli bir değer seç. Tekli seçimde listede olmayan bir metni SetValue ile geçirmek geçerli seçim oluşturmaz.',`Quality:SetValues({ "Dengeli", "Yüksek", "Özel" })\nQuality:SetValue("Özel")`) ]},
{id:'input',group:'Bileşenler',icon:'T',title:'Input',desc:'Metin girdisini al, ne zaman işleneceğini belirle ve uygulama sınırında doğrula.',sections:[
section('create','Metin kutusu oluştur','<code>Finished = true</code> ile yazım sırasında her değişiklik yerine odak bırakıldığında işlem yap. Varsayılan false’tur.',`local DisplayName = Group:AddInput("DisplayName", {\n    Text = "Profil adı",\n    Default = "Hutame",\n    Placeholder = "Bir ad yaz…",\n    Finished = true,\n    ClearTextOnFocus = false,\n    Callback = function(value)\n        print("Profil:", value)\n    end,\n})`),
section('validation','Doğrulama ve state','Numeric seçeneği sayısal metin girişi içindir; Input.Value metindir. Sayı gereken uygulama kodunda <code>tonumber</code> kullan ve başarısız dönüşümü ele al. Boş metne izin verip vermeyeceğini <code>AllowEmpty</code> ile belirle.',`DisplayName:SetValue("Yeni profil")\nprint(Library.Options.DisplayName.Value)\n\nGroup:AddInput("Count", {\n    Text = "Adet",\n    Default = "5",\n    Numeric = true,\n    Finished = true,\n    Callback = function(text)\n        local count = tonumber(text)\n        if not count or count < 1 then return end\n        print("Geçerli adet:", count)\n    end,\n})`) ]},
{id:'button',group:'Bileşenler',icon:'↵',title:'Button & Label',desc:'Bir eylemi tetikle veya kullanıcıya bağlam ver. Gerektiği kadar arayüz.',sections:[
section('button','Bir eylem oluştur','Button bir değer kontrolü değildir. İşlemi <code>Func</code> alanına ver; kütüphane <code>Callback</code> adını da kabul eder.',`Group:AddButton({\n    Text = "Varsayılanları geri yükle",\n    Func = function()\n        Library.Toggles.Notifications:SetValue(false)\n        Library.Options.Volume:SetValue(65)\n    end,\n})`),
section('label','Açıklama ekle','Label kısa açıklamalar veya durum metinleri için kullanılır. Dönen nesnenin <code>SetText</code> yöntemi ile metni yenile.',`local Status = Group:AddLabel("Hazır")\nStatus:SetText("Tercihler güncellendi")`),
section('dependencies','Örneğin bağımlılıkları','Sıfırlama düğmesi Toggle ve Slider rehberlerindeki Notifications ve Volume kontrollerini kullanır. Önce bu kontrolleri oluştur; aksi halde kayıt tablosunda bulunmazlar.') ]},
{id:'keybind',group:'Bileşenler',icon:'⌨',title:'Keybind',desc:'Toggle, buton veya label üzerine klavye ve fare kısayolu ekle; Toggle, Hold, Always ve Press modlarını doğru kullan.',props:[['Default','string','"None"','Başlangıç tuşu'],['Mode','string','"Toggle"','Always, Toggle, Hold veya Press'],['SyncToggleState','boolean','false','Toggle state’iyle eşleştirir'],['DefaultModifiers','table','{}','Ctrl, Shift gibi değiştiriciler'],['Callback','function','boş işlev','Aktif durum değişince çalışır'],['ChangedCallback','function','boş işlev','Atanan tuş değişince çalışır']],sections:[
section('toggle-key','Toggle’a kısayol ekle','Önce <code>AddToggle</code> dönüşünü bir değişkene kaydet. <code>AddKeyPicker</code> bu nesne üzerinde çağrılır. <code>SyncToggleState = true</code> olduğunda N tuşu Toggle’ı ve ona bağlı callback’i birlikte açıp kapatır.',`local NoclipToggle = Group:AddToggle("Noclip", {
    Text = "Noclip",
    Default = false,
    Callback = function(enabled)
        print("Noclip:", enabled)
    end,
})

local NoclipKey = NoclipToggle:AddKeyPicker("NoclipKey", {
    Text = "Noclip tuşu",
    Default = "N",
    Mode = "Toggle",
    SyncToggleState = true,
})`),
section('modes','Keybind modları','<code>Toggle</code> her basışta açık/kapalı değiştirir. <code>Hold</code> yalnız tuş basılıyken aktiftir. <code>Always</code> sürekli aktif kabul edilir. <code>Press</code> tek basışlık eylemler içindir ve yalnız Label veya Button üzerinde kullanılabilir.'),
section('button-key','Butona kısayol ekle','Button keybind’i yalnız <code>Press</code> modunu kabul eder. Tuşa her basıldığında butonun işlevi çalışır.',`local HealButton = Group:AddButton({
    Text = "Can doldur",
    Func = function()
        print("Buton çalıştı")
    end,
})

HealButton:AddKeyPicker("HealKey", {
    Text = "Can doldurma tuşu",
    Default = "H",
    Mode = "Press",
})`),
section('read-update','Tuşu oku ve değiştir','KeyPicker nesnesi <code>Value</code>, <code>Mode</code> ve <code>Toggled</code> alanlarını taşır. Kayıtlı nesneye <code>Library.Options.NoclipKey</code> üzerinden erişebilirsin.',`print(Library.Options.NoclipKey.Value)
print(Library.Options.NoclipKey.Mode)

NoclipKey:OnChanged(function(newKey)
    print("Yeni tuş:", newKey)
end)`),
section('common-error','En sık yapılan hata','<code>Group:AddToggle(...)</code> çağrısını değişkene atamadan sonraki satırda <code>NoclipToggle:AddKeyPicker(...)</code> yazarsan NoclipToggle nil olur. Her zaman <code>local NoclipToggle = Group:AddToggle(...)</code> şeklinde oluştur.') ]},
{id:'color-picker',group:'Bileşenler',icon:'●',title:'Color Picker',desc:'Bir Toggle veya Label’ın yanına renk seçici ekle; renk ve saydamlık state’ini yönet.',props:[['Default','Color3','Color3.new(1,1,1)','Başlangıç rengi'],['Transparency','number','0','0–1 arası saydamlık'],['Title','string','nil','Renk penceresi başlığı'],['Resizable','boolean','true','Seçicinin boyutlandırılması'],['Callback','function','boş işlev','Renk değişince çalışır']],sections:[
section('create','Renk seçici oluştur','ColorPicker doğrudan Group üzerinde değil, Toggle veya Label gibi addon destekleyen bir bileşen üzerinde oluşturulur.',`local AccentEnabled = Group:AddToggle("AccentEnabled", {
    Text = "Özel vurgu rengi",
    Default = true,
})

local AccentColor = AccentEnabled:AddColorPicker("AccentColor", {
    Title = "Vurgu rengi",
    Default = Color3.fromRGB(180, 160, 255),
    Transparency = 0,
    Callback = function(color)
        print("RGB:", color.R, color.G, color.B)
    end,
})`),
section('label-color','Label üzerinde kullan','Sadece renk seçmek istiyorsan Toggle yerine Label üzerine ekleyebilirsin.',`local ColorLabel = Group:AddLabel("Arayüz rengi")
local UiColor = ColorLabel:AddColorPicker("UiColor", {
    Default = Color3.fromRGB(120, 190, 255),
})`),
section('state','Rengi programatik değiştir','Güncel renk <code>Value</code>, saydamlık <code>Transparency</code> alanındadır. Değişiklik için SetValue kullan.',`AccentColor:SetValue(Color3.fromRGB(255, 120, 140))
print(Library.Options.AccentColor.Value)`) ]},
{id:'checkbox',group:'Bileşenler',icon:'☑',title:'Checkbox',desc:'Toggle ile aynı boolean state davranışını daha klasik kutu görünümüyle kullan.',sections:[
section('create','Checkbox oluştur','AddCheckbox, AddToggle ile aynı seçenekleri ve SetValue/OnChanged yöntemlerini kullanır. Farkı görsel sunumudur.',`local AutoSave = Group:AddCheckbox("AutoSave", {
    Text = "Otomatik kaydet",
    Default = true,
    Callback = function(enabled)
        print("Otomatik kayıt:", enabled)
    end,
})

AutoSave:SetValue(false)
print(Library.Toggles.AutoSave.Value)`),
section('addons','Addon ekle','Checkbox dönüşü de ColorPicker ve KeyPicker addon’larını destekler.',`AutoSave:AddKeyPicker("AutoSaveKey", {
    Text = "Otomatik kayıt tuşu",
    Default = "K",
    Mode = "Toggle",
    SyncToggleState = true,
})`) ]},
{id:'layout',group:'Bileşenler',icon:'▤',title:'Layout & Tabbox',desc:'Sol/sağ kolonları, katlanabilir grup kutularını, alt sekmeleri, label ve divider yapılarını düzenle.',sections:[
section('groupboxes','Groupbox seçenekleri','Kısa kullanımda ad ve ikon ver. Gelişmiş kullanımda taraf, açıklama, başlangıç görünürlüğü ve katlanma davranışını tabloyla belirle.',`local Left = Tab:AddLeftGroupbox("Oyuncu", "user")
local Right = Tab:AddRightGroupbox("Görünüm", "palette")

local Advanced = Tab:AddGroupbox({
    Side = "Right",
    Name = "Gelişmiş",
    IconName = "settings",
    Description = "İleri düzey seçenekler",
    Collapsed = true,
    DisableCollapsing = false,
    PopOut = true,
})`),
section('tabbox','Groupbox içinde alt sekmeler','Tabbox aynı sütunda birden fazla küçük sekme oluşturur. Her alt sekme normal Groupbox gibi bileşen kabul eder.',`local Modes = Tab:AddTabbox({
    Side = "Left",
    Name = "Modlar",
})

local Legit = Modes:AddTab("Legit")
local Rage = Modes:AddTab("Rage")

Legit:AddToggle("LegitEnabled", { Text = "Aktif" })
Rage:AddSlider("Range", { Text = "Menzil", Min = 1, Max = 100, Default = 25 })`),
section('label-divider','Label ve ayırıcı','Label açıklama veya canlı durum metni taşır. Divider bölümleri görsel olarak ayırır.',`local Status = Group:AddLabel("Durum: Hazır")
Group:AddDivider("Hareket")
Status:SetText("Durum: Çalışıyor")`),
section('visibility','Görünürlük ve katlama','Dönen grup nesnesini saklayarak görünürlük, katlanma ve pop-out davranışını koddan yönetebilirsin.',`Advanced:SetVisible(true)
Advanced:SetCollapsed(false)
Advanced:SetPoppedOut(true)`) ]},
{id:'media',group:'Bileşenler',icon:'▧',title:'Media & Viewport',desc:'Görsel, video, 3B model veya kendi Roblox UI nesneni bir groupbox içine yerleştir.',sections:[
section('image','Görsel ekle','Image alanı Roblox asset adresi, URL veya kütüphanenin desteklediği görsel kaynağı olabilir.',`local Banner = Group:AddImage("Banner", {
    Image = "rbxassetid://123456789",
    Height = 160,
    ScaleType = Enum.ScaleType.Fit,
    Transparency = 0,
    Visible = true,
})`),
section('video','Video ekle','VideoFrame destekleyen bir asset ver. Playing ve Looped başlangıç davranışını belirler.',`local Preview = Group:AddVideo("Preview", {
    Video = "rbxassetid://123456789",
    Height = 180,
    Playing = true,
    Looped = true,
    Volume = 0.5,
})`),
section('viewport','3B model göster','Viewport bir Model veya BasePart gösterebilir. Clone açıkken nesnenin kopyası kullanılır; Interactive sürükleme/yakınlaştırma etkileşimini açar.',`local CharacterPreview = Group:AddViewport("CharacterPreview", {
    Object = game.Players.LocalPlayer.Character,
    Clone = true,
    AutoFocus = true,
    Interactive = true,
    Height = 240,
})`),
section('passthrough','Özel UI nesnesi ekle','Kendi hazırladığın GuiObject’i UIPassthrough ile grup akışına dahil edebilirsin.',`local CustomFrame = Instance.new("Frame")
CustomFrame.BackgroundColor3 = Color3.fromRGB(40, 40, 48)

Group:AddUIPassthrough("CustomRow", {
    Instance = CustomFrame,
    Height = 40,
})`) ]},
{id:'floating',group:'Bileşenler',icon:'◇',title:'Floating widgets',desc:'Ana pencerenin dışında sürüklenebilir label, buton ve ikon butonu oluştur.',sections:[
section('label','Sürüklenebilir label','FPS, oyuncu adı veya kısa durum bilgisi gibi sürekli görünen veriler için kullan.',`local Watermark = Library:AddDraggableLabel({
    Text = "Hutame Hub | Hazır",
    Icon = "sparkles",
    IconPosition = "left",
})

Watermark:SetText("Hutame Hub | 60 FPS")
Watermark:SetVisible(true)`),
section('button','Sürüklenebilir buton','Ana pencere kapalıyken de ulaşılabilen küçük bir eylem düğmesi oluştur.',`local QuickButton = Library:AddDraggableButton({
    Text = "Menüyü Aç",
    Func = function()
        Window:Toggle(true)
    end,
})`),
section('image-button','Sürüklenebilir ikon butonu','Metin yerine Lucide ikonu kullanan kompakt butondur.',`local GearButton = Library:AddDraggableImageButton({
    Icon = "settings",
    Func = function()
        Window:Toggle()
    end,
})`) ]},
{id:'feedback',group:'Sistem',icon:'!',title:'Notify, Dialog & Loading',desc:'Kullanıcıya kısa bildirim, onay penceresi veya adımlı yükleme durumu göster.',sections:[
section('notify','Bildirim göster','Başlık, açıklama, süre ve ikon ver. Notify tarafı pencere ayarındaki NotifySide değerini kullanır.',`Library:Notify({
    Title = "Kaydedildi",
    Description = "Ayarların başarıyla kaydedildi.",
    Time = 4,
    Icon = "circle-check",
})`),
section('dialog','Dialog oluştur','Dialog daha önemli kararlar içindir. FooterButtons dizisindeki her düğmeye metin ve callback ver.',`Window:AddDialog("ResetDialog", {
    Title = "Ayarları sıfırla",
    Description = "Bütün değerler varsayılana dönecek.",
    AutoDismiss = true,
    OutsideClickDismiss = true,
    FooterButtons = {
        {
            Text = "İptal",
            Callback = function() print("İptal edildi") end,
        },
        {
            Text = "Sıfırla",
            Risky = true,
            Callback = function() print("Sıfırlandı") end,
        },
    },
})`),
section('loading','Yükleme ekranı','Uzun kurulumlarda kullanıcıya kaçıncı adımda olduğunu göster. Yükleme nesnesinin metotlarını kullanmadan önce dönüşünü sakla.',`local Loading = Library:CreateLoading({
    Title = "Hutame Hub yükleniyor",
    CurrentStep = 0,
    TotalSteps = 3,
})

-- Kendi yükleme işlemlerini yap ve Library.lua içindeki
-- Loading nesnesi yöntemleriyle adımları ilerlet.`) ]},
{id:'window-api',group:'Sistem',icon:'□',title:'Window API',desc:'Pencerenin başlığını, alt bilgisini, görünürlüğünü, yan menüsünü ve davranışlarını çalışma sırasında değiştir.',props:[['Title / Footer','string','No Title / No Footer','Başlık ve alt bilgi'],['Size','UDim2','720 × 600','Başlangıç boyutu'],['ToggleKeybind','Enum.KeyCode','RightControl','Menüyü açma tuşu'],['Resizable','boolean','true','Boyutlandırma'],['GlobalSearch','boolean','false','Global arama'],['SidebarCompacted','boolean','false','Kompakt yan menü']],sections:[
section('create','Tam pencere örneği','İlk kurulumda en sık kullanılan pencere seçenekleri aşağıdadır.',`local Window = Library:CreateWindow({
    Title = "Hutame Hub",
    Footer = "v1.0.0",
    Size = UDim2.fromOffset(720, 600),
    Center = true,
    AutoShow = true,
    Resizable = true,
    AlwaysOnTop = false,
    GlobalSearch = true,
    ToggleKeybind = Enum.KeyCode.RightControl,
    NotifySide = "Right",
})`),
section('runtime','Çalışma sırasında değiştir','Window referansı üzerinden başlık, footer, köşe, sidebar ve pencere görünürlüğü yönetilebilir.',`Window:ChangeTitle("Hutame Hub — Oyuncu")
Window:SetFooter("Bağlandı")
Window:SetCornerRadius(6)
Window:SetCompact(true)
Window:SetSidebarWidth(180)
Window:Toggle() -- Göster / gizle`),
section('tabs','Sekme oluşturma biçimleri','Hem kısa argüman biçimi hem tablo biçimi geçerlidir. Dönen Tab nesnesini mutlaka değişkende tut.',`local PlayerTab = Window:AddTab("Oyuncu", "user")

local SettingsTab = Window:AddTab({
    Name = "Ayarlar",
    Icon = "settings",
    Description = "Arayüz ve profil ayarları",
    Order = 10,
})`),
section('common-error','Nil hatalarını okuma','<code>attempt to index nil with AddLeftGroupbox</code> görürsen bir önceki nesne nil’dir: önce Window ve Tab dönüşlerini kontrol et. <code>attempt to index nil with AddKeyPicker</code> görürsen Toggle dönüşünü değişkene atadığından emin ol.') ]},
{id:'dependencies',group:'Sistem',icon:'⌁',title:'Dependencies',desc:'Bir kontrolü başka bir Toggle veya Dropdown değerine göre göster; karmaşık ayarları sade tut.',sections:[
section('box','DependencyBox oluştur','Bağımlılık kutusunun içindeki kontroller yalnız koşullar sağlandığında görünür. Önce kontrol referansını oluştur, sonra koşula ver.',`local AdvancedEnabled = Group:AddToggle("AdvancedEnabled", {
    Text = "Gelişmiş ayarlar",
    Default = false,
})

local AdvancedBox = Group:AddDependencyBox()
AdvancedBox:SetupDependencies({
    { AdvancedEnabled, true },
})

AdvancedBox:AddSlider("AdvancedPower", {
    Text = "Güç",
    Min = 0,
    Max = 100,
    Default = 50,
})`),
section('reason','Ne zaman kullanılır?','Bir özellik kapalıyken ona bağlı ayrıntıları gizlemek için kullan. Callback içinde kontrolleri Destroy edip yeniden üretmek yerine dependency görünürlüğünü tercih et.') ]},
{id:'config',group:'Rehberler',icon:'⚙',title:'Config sistemi',desc:'Kontrol değerlerini JSON olarak kaydet, doğrulayarak yükle ve yeni seçeneklerle uyumlu tut.',sections:[
section('scope','Neler kaydedilir?','Toggle değerleri <code>Library.Toggles</code>, slider/dropdown/input/keybind/color değerleri <code>Library.Options</code> tablolarındadır. Kütüphane tek başına otomatik dosya kaydı yapmaz; dosya API’leri executor ortamına bağlıdır.'),
section('safe-flow','Güvenli yükleme sırası','Önce bütün UI kontrollerini oluştur. Sonra config dosyasını oku, JSON’u çöz, beklenen alanları doğrula ve her değeri ilgili kontrolün <code>SetValue</code> yöntemiyle uygula. Doğrudan <code>.Value =</code> atamak görsel state’i ve callback’leri senkron tutmayabilir.'),
section('minimal','Basit kayıt örneği','Bu örnek yalnız temel değer tiplerini gösterir. Color3 ve karmaşık multi-dropdown tablolarını kaydederken ayrıca dönüştürme gerekir.',`local HttpService = game:GetService("HttpService")
local path = "Hutame-new-lib/config.json"

local function saveConfig()
    local data = {
        Notifications = Library.Toggles.Notifications.Value,
        Volume = Library.Options.Volume.Value,
        Quality = Library.Options.Quality.Value,
    }
    if makefolder and not isfolder("Hutame-new-lib") then
        makefolder("Hutame-new-lib")
    end
    writefile(path, HttpService:JSONEncode(data))
end

local function loadConfig()
    if not isfile(path) then return end
    local data = HttpService:JSONDecode(readfile(path))
    if typeof(data.Notifications) == "boolean" then
        Library.Toggles.Notifications:SetValue(data.Notifications)
    end
    if typeof(data.Volume) == "number" then
        Library.Options.Volume:SetValue(data.Volume)
    end
    if typeof(data.Quality) == "string" then
        Library.Options.Quality:SetValue(data.Quality)
    end
end`) ]},
{id:'unload',group:'Rehberler',icon:'×',title:'Unload & temizlik',desc:'UI kapanırken bağlantıları kes, değiştirdiğin oyun değerlerini geri yükle ve tekrar çalıştırmayı güvenli yap.',sections:[
section('button','Unload butonu','Riskli ve çift tıklamalı bir buton yanlışlıkla kapatmayı önler.',`MenuGroup:AddButton({
    Text = "UI'yi Kaldır",
    Risky = true,
    DoubleClick = true,
    Func = function()
        Library:Unload()
    end,
})`),
section('cleanup','Kendi bağlantılarını temizle','Library yalnız kendi oluşturduğu UI bağlantılarını bilir. RunService bağlantıları ve değiştirdiğin karakter değerleri için temizleme callback’i ekle.',`local connection = game:GetService("RunService").Heartbeat:Connect(function()
    -- Uygulama döngüsü
end)

Library:OnUnload(function()
    if connection then
        connection:Disconnect()
        connection = nil
    end
end)`),
section('reload','Script tekrar çalıştırılırsa','Güncel Library.lua aynı global instance’ı görürse önceki UI’yi otomatik olarak unload eder. Böylece tekrar execute edildiğinde menüler üst üste binmez. Kendi sistemlerinin temizliği için OnUnload yine gereklidir.') ]},
{id:'icons',group:'Kaynaklar',icon:'✦',title:'Icons',desc:'Arayüzünde kullanabileceğin Lucide ikonlarını gör, filtrele ve adını tek tıkla kopyala.',icons:true,sections:[
section('icon-usage','İkon nasıl kullanılır?','Kartın altındaki adı <code>Icon</code> veya <code>IconName</code> alanına yaz. İkon adları küçük harfli ve tirelidir. Bir karta tıklarsan adı panoya kopyalanır.',`local Tab = Window:AddTab({\n    Name = "Ayarlar",\n    Icon = "settings",\n})\n\nlocal Group = Tab:AddLeftGroupbox("Oyuncu", "user")\nGroup:AddButton({\n    Text = "Yenile",\n    Icon = "refresh-cw",\n    Func = function()\n        print("Yenilendi")\n    end,\n})`),
section('icon-notes','Nerelerde kullanılabilir?','Sekmelerde <code>Icon</code>, groupbox başlığında ikinci argüman veya <code>IconName</code>, buton ve bildirimlerde <code>Icon</code> kullanabilirsin. Kütüphane Lucide sağlayıcısını yüklediği için katalog dışındaki geçerli Lucide adları da çalışabilir.') ]},
{id:'full-example',group:'Rehberler',icon:'▣',title:'Tam UI örneği',desc:'Birden fazla sekme, gerçek kontroller, JSON config sistemi, menü keybind’i ve güvenli unload akışı tek dosyada.',exampleFile:'./FullExample.lua',sections:[
section('architecture','Örnekte neler var?','Dört sekmeli tam pencere yapısı içerir: Ana sayfa, Oyuncu, Görünüm ve Ayarlar. Toggle, slider, dropdown, input, color picker, key picker, bildirim, watermark ve dinamik label aynı örnekte birlikte kullanılır.'),
section('config-system','Config nasıl çalışıyor?','Ayarlar sekmesi seçili değerleri <code>Hutame-new-lib/configs</code> altında JSON olarak kaydeder. Dosya API’leri bulunmayan executor ortamlarında hata vermek yerine kullanıcıya bildirim gösterir. Config adı temizlenir; liste yenilenebilir, seçili kayıt yüklenebilir.'),
section('menu-unload','Menü ve unload','Menü varsayılan olarak <code>RightControl</code> ile açılıp kapanır. Kırmızı unload düğmesi çift tıklama ister. <code>Library:OnUnload</code> örneğin değiştirdiği WalkSpeed ve JumpPower değerlerini varsayılana döndürür.'),
section('run-example','Nasıl çalıştırılır?','Aşağıdaki kodun tamamını executor’a yapıştır veya dosyayı indir. Örnek Library.lua dosyasını public raw GitHub adresinden yükler; config için executor’ın <code>writefile</code>, <code>readfile</code> ve ilgili dosya işlevlerini desteklemesi gerekir. Bu rehberin kalıcı adresi <code>/Hutame-new-lib/full-example/</code> yoludur.') ]},
{id:'state',group:'Rehberler',icon:'⌁',title:'State yönetimi',desc:'Arayüz değerleri ile uygulama davranışları arasında anlaşılır bir sınır kur.',sections:[
section('source','Tek bir doğruluk kaynağı','Küçük arayüzlerde bileşenin Value alanı yeterlidir. Uygulama büyüdükçe state’i tek tabloda topla; kontrol callback’lerini uygulama işlevlerine yönlendir. Aynı yan etkiyi hem Callback hem OnChanged içine yazma.',`local state = { notifications = false, volume = 65 }\n\nlocal function setNotifications(enabled)\n    state.notifications = enabled\n    -- Uygulamadaki yan etkiyi burada uygula\nend\n\nlocal control = Group:AddToggle("Notifications", {\n    Text = "Bildirimler",\n    Default = state.notifications,\n    Callback = setNotifications,\n})\nsetNotifications(control.Value)`),
section('sync','Programatik senkronizasyon','UI üzerinden değişim callback’e gider. Dışarıdan gelen değişimi de SetValue üzerinden geçir; böylece UI ve uygulama state’i birlikte güncellenir. Gereksiz callback çağrılarını değer kontrolüyle önle.',`local function updateFromProfile(enabled)\n    if control.Value ~= enabled then\n        control:SetValue(enabled)\n    end\nend\nupdateFromProfile(true)`),
section('persist','Kalıcılık sınırı','Library.lua tek başına otomatik profil kaydetme sağlamaz. State tablosu oturum belleğindedir. Kalıcı kayıt gerekiyorsa kendi depolama katmanında serileştir, yüklenen veriyi doğrula ve mevcut kontrollere SetValue ile uygula. Bu repoda ThemeManager/SaveManager addon dosyaları bulunmaz.'),
section('cleanup','Bağlantıları temizle','Arayüz kapanınca uygulamaya ait event bağlantılarını OnUnload ile sonlandır. Toggle açıldığında yeni bir döngü başlatıyorsan kapandığında ve unload sırasında durmasını sağla.') ]},
{id:'customization',group:'Rehberler',icon:'◐',title:'Özelleştirme',desc:'Pencerenin görünümünü ve hareket dilini kendi arayüzüne uyarla.',sections:[
section('window','Pencere seçenekleri','Boyut, köşe yarıçapı, yazı tipi ve görünürlük tuşunu pencere oluştururken belirle. Buradaki örnek yeni bir pencere oluşturur; mevcut kurulum örneğinin CreateWindow çağrısının yerine kullan.',`local Window = Library:CreateWindow({\n    Title = "My workspace",\n    Footer = "Hutame UI",\n    Size = UDim2.fromOffset(720, 600),\n    Font = Enum.Font.Code,\n    CornerRadius = 4,\n    ToggleKeybind = Enum.KeyCode.RightControl,\n    Center = true,\n    AutoShow = true,\n    Resizable = true,\n})`),
section('motion','Animasyonları aç','Kaynakta bu animasyonlar varsayılan olarak kapalıdır. CreateWindow seçeneklerine aşağıdaki tabloyu ekleyerek açabilirsin.',`Animations = {\n    ToggleWindow = true,\n    TabSwitch = true,\n    Groupbox = true,\n    Dropdown = true,\n    KeyPicker = true,\n},\nTabTransitionTime = 0.22,\nTabSwipeOffset = 26,\nTabSwipeFrom = "bottom",`),
section('responsive','Boyutlandırma ve mobil','Kütüphane mobil platformu algılar; pencerenin yeniden boyutlandırılmasını Resizable yönetir. Uzun etiketleri, dar pencereleri ve dokunmatik etkileşimleri hedef Roblox ortamında ayrıca test et. Bu dokümantasyonun responsive tasarımı, oyun içi arayüz doğrulamasının yerine geçmez.') ]},
{id:'publishing',group:'Rehberler',icon:'↗',title:'GitHub Pages',desc:'Dokümantasyonu derleme adımı olmadan yayınla ve güncel tut.',sections:[
section('deploy','Yayınlama','Bu site docs klasöründe bağımsız HTML, CSS ve JavaScript dosyaları olarak bulunur. GitHub deposunda Settings → Pages → Build and deployment bölümünde Deploy from a branch seç; main dalı ve /docs klasörünü kaydet. Değişikliklerin önce GitHub’a gönderilmiş olması gerekir.'),
section('paths','Alt dizinlerle uyumlu','Tüm varlık yolları görecelidir. Bölüm rotaları #toggle gibi hash adresleri kullanır; doğrudan bağlantılar ve yenilemeler için sunucu yönlendirmesi gerekmez. Repo adı değiştiğinde dosya yollarını yeniden derlemene gerek yoktur.'),
section('maintenance','İçeriği güncelle','Rehberler content.js dosyasındadır. Yeni bir bileşen eklerken kodu Library.lua ile karşılaştır, kimliklerini benzersiz tut ve gerçek Luau ortamında doğrula. Tarayıcı demosu gerçek kütüphaneyi çalıştırmaz; etkileşimleri açıklamak için hazırlanmıştır.') ]}
];

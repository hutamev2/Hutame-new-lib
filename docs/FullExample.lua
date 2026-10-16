-- Hutame UI - full example
-- Config files are stored in Hutame-new-lib/configs when the executor supports file APIs.

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

local Library = loadstring(game:HttpGet(
    "https://raw.githubusercontent.com/hutamev2/Hutame-new-lib/main/Library.lua"
))()

local Window = Library:CreateWindow({
    Title = "Hutame Hub",
    Footer = "Hutame UI - full example",
    Size = UDim2.fromOffset(720, 600),
    Center = true,
    AutoShow = true,
    Resizable = true,
    ToggleKeybind = Enum.KeyCode.RightControl,
    GlobalSearch = true,
    Animations = {
        ToggleWindow = true,
        TabSwitch = true,
        Groupbox = true,
        Dropdown = true,
        KeyPicker = true,
    },
})

Library:SetWatermark("Hutame Hub | " .. Players.LocalPlayer.Name)
Library:SetWatermarkVisibility(true)

local HomeTab = Window:AddTab({ Name = "Ana sayfa", Icon = "house" })
local PlayerTab = Window:AddTab({ Name = "Oyuncu", Icon = "user" })
local VisualTab = Window:AddTab({ Name = "Görünüm", Icon = "eye" })
local SettingsTab = Window:AddTab({ Name = "Ayarlar", Icon = "settings" })

-- Ana sayfa
local Welcome = HomeTab:AddLeftGroupbox("Hoş geldin", "sparkles")
Welcome:AddLabel("Bu örnek Hutame UI'nin temel akışını gösterir.")
Welcome:AddDivider()
Welcome:AddButton({
    Text = "Test bildirimi gönder",
    Func = function()
        Library:Notify({
            Title = "Hutame UI",
            Description = "Bildirim sistemi çalışıyor.",
            Time = 4,
            Icon = "bell",
        })
    end,
})

local Runtime = HomeTab:AddRightGroupbox("Çalışma durumu", "activity")
local StatusLabel = Runtime:AddLabel("Durum: Hazır")
Runtime:AddButton({
    Text = "Durumu yenile",
    Func = function()
        StatusLabel:SetText("Durum: " .. os.date("%H:%M:%S"))
    end,
})

-- Oyuncu sekmesi
local Movement = PlayerTab:AddLeftGroupbox("Hareket", "move")
Movement:AddToggle("Sprint", {
    Text = "Sprint",
    Default = false,
    Callback = function(enabled)
        print("Sprint:", enabled)
    end,
})

Movement:AddSlider("WalkSpeed", {
    Text = "Yürüme hızı",
    Default = 16,
    Min = 8,
    Max = 100,
    Rounding = 0,
    Suffix = " studs/s",
    Callback = function(value)
        local character = Players.LocalPlayer.Character
        local humanoid = character and character:FindFirstChildOfClass("Humanoid")
        if humanoid then
            humanoid.WalkSpeed = value
        end
    end,
})

Movement:AddSlider("JumpPower", {
    Text = "Zıplama gücü",
    Default = 50,
    Min = 25,
    Max = 150,
    Rounding = 0,
    Callback = function(value)
        local character = Players.LocalPlayer.Character
        local humanoid = character and character:FindFirstChildOfClass("Humanoid")
        if humanoid then
            humanoid.UseJumpPower = true
            humanoid.JumpPower = value
        end
    end,
})

local Targeting = PlayerTab:AddRightGroupbox("Hedefleme", "crosshair")
Targeting:AddDropdown("TargetPart", {
    Text = "Hedef bölgesi",
    Values = { "Head", "HumanoidRootPart", "UpperTorso" },
    Default = "HumanoidRootPart",
    Multi = false,
    Callback = function(value)
        print("Hedef bölgesi:", value)
    end,
})

Targeting:AddInput("TargetName", {
    Text = "Oyuncu adı",
    Default = "",
    Placeholder = "İsim yaz...",
    Finished = true,
    ClearTextOnFocus = false,
    Callback = function(value)
        print("Hedef oyuncu:", value)
    end,
})

-- Görünüm sekmesi
local Interface = VisualTab:AddLeftGroupbox("Arayüz", "palette")
Interface:AddToggle("Watermark", {
    Text = "Watermark göster",
    Default = true,
    Callback = function(enabled)
        Library:SetWatermarkVisibility(enabled)
    end,
})

local AccentLabel = Interface:AddLabel("Vurgu rengi")
AccentLabel:AddColorPicker("AccentColor", {
    Default = Color3.fromRGB(125, 85, 255),
    Callback = function(color)
        Library.Scheme.AccentColor = color
        Library:UpdateColorsUsingRegistry()
    end,
})

Interface:AddDropdown("NotifySide", {
    Text = "Bildirim konumu",
    Values = { "Right", "Left" },
    Default = "Right",
    Callback = function(value)
        Library:SetNotifySide(value)
    end,
})

local WindowBox = VisualTab:AddRightGroupbox("Pencere", "panel-left")
WindowBox:AddToggle("CompactSidebar", {
    Text = "Kompakt kenar çubuğu",
    Default = false,
    Callback = function(enabled)
        Window:SetCompact(enabled)
    end,
})

-- Ayarlar ve config sistemi
local ConfigFolder = "Hutame-new-lib/configs"
local Configs = SettingsTab:AddLeftGroupbox("Config", "folder-cog")

Configs:AddInput("ConfigName", {
    Text = "Config adı",
    Default = "default",
    Placeholder = "default",
    Finished = true,
    ClearTextOnFocus = false,
})

local ConfigList = Configs:AddDropdown("ConfigList", {
    Text = "Kayıtlı configler",
    Values = {},
    AllowNull = true,
})

local function notify(title, description)
    Library:Notify({ Title = title, Description = description, Time = 4 })
end

local function fileSupport()
    return writefile and readfile and isfile and isfolder and makefolder and listfiles
end

local function cleanName(name)
    name = tostring(name or "default"):gsub("[^%w_%-]", "")
    return name ~= "" and name or "default"
end

local function configPath(name)
    return ConfigFolder .. "/" .. cleanName(name) .. ".json"
end

local function refreshConfigs()
    if not fileSupport() then
        ConfigList:SetValues({})
        return
    end

    if not isfolder(ConfigFolder) then
        makefolder(ConfigFolder)
    end

    local names = {}
    for _, path in listfiles(ConfigFolder) do
        local name = path:match("([^/\\]+)%.json$")
        if name then
            table.insert(names, name)
        end
    end
    table.sort(names)
    ConfigList:SetValues(names)
end

local function readState()
    local accent = Library.Options.AccentColor.Value
    return {
        Sprint = Library.Toggles.Sprint.Value,
        WalkSpeed = Library.Options.WalkSpeed.Value,
        JumpPower = Library.Options.JumpPower.Value,
        TargetPart = Library.Options.TargetPart.Value,
        TargetName = Library.Options.TargetName.Value,
        Watermark = Library.Toggles.Watermark.Value,
        AccentColor = { accent.R, accent.G, accent.B },
        NotifySide = Library.Options.NotifySide.Value,
        CompactSidebar = Library.Toggles.CompactSidebar.Value,
    }
end

local function applyState(data)
    if typeof(data) ~= "table" then
        return false
    end

    if typeof(data.Sprint) == "boolean" then Library.Toggles.Sprint:SetValue(data.Sprint) end
    if tonumber(data.WalkSpeed) then Library.Options.WalkSpeed:SetValue(data.WalkSpeed) end
    if tonumber(data.JumpPower) then Library.Options.JumpPower:SetValue(data.JumpPower) end
    if typeof(data.TargetPart) == "string" then Library.Options.TargetPart:SetValue(data.TargetPart) end
    if typeof(data.TargetName) == "string" then Library.Options.TargetName:SetValue(data.TargetName) end
    if typeof(data.Watermark) == "boolean" then Library.Toggles.Watermark:SetValue(data.Watermark) end
    if typeof(data.AccentColor) == "table" and #data.AccentColor == 3 then
        Library.Options.AccentColor:SetValueRGB(Color3.new(
            tonumber(data.AccentColor[1]) or 0,
            tonumber(data.AccentColor[2]) or 0,
            tonumber(data.AccentColor[3]) or 0
        ))
    end
    if typeof(data.NotifySide) == "string" then Library.Options.NotifySide:SetValue(data.NotifySide) end
    if typeof(data.CompactSidebar) == "boolean" then
        Library.Toggles.CompactSidebar:SetValue(data.CompactSidebar)
    end
    return true
end

Configs:AddButton({
    Text = "Config kaydet",
    Func = function()
        if not fileSupport() then
            return notify("Config", "Executor dosya API'lerini desteklemiyor.")
        end
        if not isfolder(ConfigFolder) then makefolder(ConfigFolder) end
        local name = cleanName(Library.Options.ConfigName.Value)
        writefile(configPath(name), HttpService:JSONEncode(readState()))
        refreshConfigs()
        ConfigList:SetValue(name)
        notify("Config kaydedildi", name)
    end,
})

Configs:AddButton({
    Text = "Seçili configi yükle",
    Func = function()
        local name = ConfigList.Value or cleanName(Library.Options.ConfigName.Value)
        local path = configPath(name)
        if not fileSupport() or not isfile(path) then
            return notify("Config bulunamadı", name)
        end
        local success, data = pcall(HttpService.JSONDecode, HttpService, readfile(path))
        if not success or not applyState(data) then
            return notify("Config hatası", "JSON verisi okunamadı.")
        end
        notify("Config yüklendi", name)
    end,
})

Configs:AddButton({
    Text = "Config listesini yenile",
    Func = refreshConfigs,
})

local Menu = SettingsTab:AddRightGroupbox("Menü", "sliders-horizontal")
local MenuVisible = Menu:AddToggle("MenuVisible", {
    Text = "Menü görünür",
    Default = true,
    Callback = function(enabled)
        Library:Toggle(enabled)
    end,
})

MenuVisible:AddKeyPicker("MenuKey", {
    Text = "Menü tuşu",
    Default = "RightControl",
    Mode = "Toggle",
    SyncToggleState = true,
})

Menu:AddButton({
    Text = "UI'yi tamamen kaldır",
    Risky = true,
    DoubleClick = true,
    Func = function()
        Library:Unload()
    end,
})

Library:OnUnload(function()
    local character = Players.LocalPlayer.Character
    local humanoid = character and character:FindFirstChildOfClass("Humanoid")
    if humanoid then
        humanoid.WalkSpeed = 16
        humanoid.JumpPower = 50
    end
    print("Hutame UI kaldırıldı ve örnek temizlendi.")
end)

refreshConfigs()
Library:Notify({
    Title = "Hutame UI",
    Description = "Tam örnek yüklendi. Menüyü RightControl ile açıp kapatabilirsin.",
    Time = 6,
})

const xml2js = require('xml2js');
const ArcticFoxEncryption = require('arcticfox-encryption');

const enumClickAction = {
    0: 'None',
    1: 'Edit',
    2: 'ProfileSelector',
    3: 'TemperatureDominant',
    4: 'MainScreenClock',
    5: 'OnOff',
    6: 'LslOnOff',
    7: 'MainMenu',
    8: 'PreheatEdit',
    9: 'ProfileEdit',
    10: 'SmartOnOff',
    11: 'InfoScreen',
    12: 'ResetCounters',
    13: 'StealthOnOff',
    14: 'KeyLock',
    15: 'LockResistance',
    16: 'PowerBank',
    17: 'DeviceLock',
    18: 'ReReadResistanceAndSaveToProfile',
    19: 'ReReadResistanceAndSmart'
};

const enumClassicLineContent = {
    /*
    internal enum ClassicLineContent : byte
{
    NonDominant = 0,

    Volt = 0x10,
    Resistance = 0x20,
    Amps = 0x30,
    Puffs = 0x31,
    Time = 0x32,
    BatteryVolts = 0x33,
    Vout = 0x34,
    BoardTemperature = 0x35,
    RealResistance = 0x36,
    DateTime = 0x37,
    LastPuff = 0x38,
    LastTemperature = 0x39,
    LastPower = 0x3A,
    CoilTemperature = 0x3B,
    Battery = 0x40,
    BatteryWithPercents = 0x41,
    BatteryWithVolts = 0x42,

    FireTimeMask = 0x80
}
     */
    0: 'NonDominant',
    16: 'Volt',
    32: 'Resistance',
    48: 'Amps',
    49: 'Puffs',
    50: 'Time',
    51: 'BatteryVolts',
    52: 'Vout',
    53: 'BoardTemperature',
    54: 'RealResistance',
    55: 'DateTime',
    56: 'LastPuff',
    57: 'LastTemperature',
    58: 'LastPower',
    59: 'CoilTemperature',
    60: 'BatteryPercents',
    64: 'Battery',
    65: 'BatteryWithPercents',
    66: 'BatteryWithVolts',
};

const enumCircleLineContent = {
    /*
internal enum CircleLineContent : byte
{

    Resistance = 0x20,
    Amps = 0x30,
    Puffs = 0x31,
    Time = 0x32,
    BatteryVolts = 0x33,
    Vout = 0x34,
    BoardTemperature = 0x35,
    RealResistance = 0x36,
    DateTime = 0x37,
    LastPuff = 0x38,
    LastTemperature = 0x39,
    LastPower = 0x3A,
    CoilTemperature = 0x3B,
    Battery = 0x40,
    BatteryWithPercents = 0x41,
    BatteryWithVolts = 0x42,

    FireTimeMask = 0x80
}

     */
    16: 'Volt',
    32: 'Resistance',
    48: 'Amps',
    49: 'Puffs',
    50: 'Time',
    51: 'BatteryVolts',
    52: 'Vout',
    53: 'BoardTemperature',
    54: 'RealResistance',
    55: 'DateTime',
    56: 'LastPuff',
    57: 'LastTemperature',
    58: 'LastPower',
    59: 'CoilTemperature',
    64: 'Battery',
    65: 'BatteryWithPercents',
    66: 'BatteryWithVolts',
};


const enumSmallLineContent = {
    /*
internal enum SmallLineContent : byte
{
    Resistance = 0x20,
    Amps = 0x30,
    Puffs = 0x31,
    Time = 0x32,
    BatteryVolts = 0x33,
    Vout = 0x34,
    BoardTemperature = 0x35,
    RealResistance = 0x36,
    DateTime = 0x37,
    LastPuff = 0x38,
    LastTemperature = 0x39,
    LastPower = 0x3A,
    BatteryPercents = 0x3B,
    CoilTemperature = 0x3C,

    FireTimeMask = 0x80
}
     */
    32: 'Resistance',
    48: 'Amps',
    49: 'Puffs',
    50: 'Time',
    51: 'BatteryVolts',
    52: 'Vout',
    53: 'BoardTemperature',
    54: 'RealResistance',
    55: 'DateTime',
    56: 'LastPuff',
    57: 'LastTemperature',
    58: 'LastPower',
    59: 'CoilTemperature',
};



const enumFoxyLineContent = {
    /*
    internal enum FoxyLineContent : byte
{
    Amps = 0x30,
    Puffs = 0x31,
    Time = 0x32,
    BatteryVolts = 0x33,
    Vout = 0x34,
    RealResistance = 0x35,
    DateTime = 0x36,
    LastPuff = 0x37,
    LastTemperature = 0x38,
    LastPower = 0x39,
    CoilTemperature = 0x3A,

    FireTimeMask = 0x80
}
     */
    48: 'Amps',
    49: 'Puffs',
    50: 'Time',
    51: 'BatteryVolts',
    52: 'Vout',
    53: 'RealResistance',
    54: 'DateTime',
    55: 'LastPuff',
    56: 'LastTemperature',
    57: 'LastPower',
    58: 'CoilTemperature'
};

const enumMaterial = {
    0: 'VariWatt',
    1: 'Nickel',
    2: 'Titanium',
    3: 'StainlessSteel',
    4: 'TCR',
    5: 'TFR1',
    6: 'TFR2',
    7: 'TFR3',
    8: 'TFR4',
    9: 'TFR5',
    10: 'TFR6',
    11: 'TFR7',
    12: 'TFR8'
};

const enumShortcutsInEdit = {
    0: 'None',
    1: 'ResetCounters'
};

const enumShortcutsInSelector = {
    0: 'None',
    1: 'ResetResistance'
};

const enumShortcutsInMenu = {
    0: 'None',
    1: 'Back',
    2: 'Exit'
};

const enumDeepSleepMode = {
    0: 'Standart',
    1: 'DeviceOff',
    2: 'DeviceLock'
};

const enumChargeScreenType = {
    0: 'Classic',
    1: 'Extended'
};

const enumChargeExtraType = {
    0: 'None',
    1: 'AnalogClock',
    2: 'DigitalClock',
    3: 'Logo'
};

const enumFiveClicks = {
    0: 'OnOff',
    1: 'LockUnlock'
};

const enumClockType = {
    0: 'Analog',
    1: 'Digital'
};

const enumPuffsTimeFormat = {
    0: 'Seconds',
    1: 'HourMinuteSeconds'
};

const enumSkin = {
    0: 'Classic',
    1: 'Circle',
    2: 'Foxy'
};

const enumBatteryModel = {
    0: 'Generic',
    1: 'Custom1',
    2: 'Custom2',
    3: 'Custom3'
};

const enumDisplaySize = {
    0: 'W64H128',
    1: 'W96H16'
};

const enumRtcMode = {
    0: 'Lxt',
    1: 'Lirc',
    2: 'Lsl'
};

const enumPreheatType = {
    0: 'Watts',
    1: 'Percents',
    2: 'Curve'
};

const enumSmartMode = {
    0: 'Off',
    1: 'On',
    2: 'Lazy'
};

const enumScreenProtectionTime = {
    0: 'Off',
    1: 'Min1',
    2: 'Min2',
    5: 'Min5',
    10: 'Min10',
    15: 'Min15',
    20: 'Min20',
    30: 'Min30'
};

const enumTemperatureUnits = {
    0: 'Fahrenheit',
    1: 'Celsius'
};

const enumDateFormat = {
    0: 'DDMMYY',
    1: 'MMDDYY'
};

const enumTimeFormat = {
    0: 'H24',
    1: 'H12'
};

class AfcFile {

    decodeAfc(buf) {
        return (new ArcticFoxEncryption()).decode(buf).toString();
    }

    encodeAfc(str) {
        return (new ArcticFoxEncryption().encode(Buffer.from(str)));
    }

    conf2xml(config) {
        function smallLineContent(attr) {
            return enumSmallLineContent[config[attr]] + (config[attr + 'Puff'] ? ', FireTimeMask' : '');
        }
        function circleLineContent(attr) {
            return enumCircleLineContent[config[attr]] + (config[attr + 'Puff'] ? ', FireTimeMask' : '');
        }
        function classicLineContent(attr) {
            return enumClassicLineContent[config[attr]] + (config[attr + 'Puff'] ? ', FireTimeMask' : '');
        }

        function foxyLineContent(attr) {
            return enumFoxyLineContent[config[attr]] + (config[attr + 'Puff'] ? ', FireTimeMask' : '');
        }

        const map = {
            'Model.Info.SettingsVersion': config.SettingsVersion,
            'Model.Info.ProductId': config.ProductId,
            'Model.Info.HardwareVersion': config.HardwareVersion,
            'Model.Info.MaxDevicePower': config.MaxDevicePower,
            'Model.Info.NumberOfBatteries': config.NumberOfBatteries,
            'Model.Info.MaxChargingCurrent': config.MaxChargingCurrent,
            'Model.Info.DisplaySize': enumDisplaySize[config.DisplaySize],
            'Model.Info.FirmwareVersion': config.FirmwareVersion,
            'Model.Info.FirmwareBuild': config.FirmwareBuild,

            'Model.General.Profiles[0].Name': config.profiles[0].Name,
            'Model.General.Profiles[0].Flags.Material': enumMaterial[config.profiles[0].Material],
            'Model.General.Profiles[0].Flags.IsTemperatureDominant': config.profiles[0].IsTemperatureDominant,
            'Model.General.Profiles[0].Flags.IsResistanceLocked': config.profiles[0].IsResistanceLocked,
            'Model.General.Profiles[0].Flags.IsEnabled': config.profiles[0].IsEnabled,
            'Model.General.Profiles[0].Flags2.IsPIEnabled': config.profiles[0].IsPIEnabled,
            'Model.General.Profiles[0].Flags2.IsPowerStep1W': config.profiles[0].IsPowerStep1W,
            'Model.General.Profiles[0].Flags2.IsTemperatureStep1C2F': config.profiles[0].IsTemperatureStep1C2F,
            'Model.General.Profiles[0].Power': Math.round(config.profiles[0].Power * 10),
            'Model.General.Profiles[0].PreheatType': enumPreheatType[config.profiles[0].PreheatType],
            'Model.General.Profiles[0].SelectedCurve': config.profiles[0].SelectedCurve,
            'Model.General.Profiles[0].PreheatTime': config.profiles[0].PreheatTime,
            'Model.General.Profiles[0].PreheatDelay': config.profiles[0].PreheatDelay,
            'Model.General.Profiles[0].PreheatPower': config.profiles[0].PreheatPower,
            'Model.General.Profiles[0].Temperature': config.profiles[0].Temperature,
            'Model.General.Profiles[0].Resistance': config.profiles[0].Resistance,
            'Model.General.Profiles[0].TCR': config.profiles[0].TCR,
            'Model.General.Profiles[0].PIRegulator.Range': config.profiles[0].PIRegulatorRange,
            'Model.General.Profiles[0].PIRegulator.PValue': config.profiles[0].PIRegulatorPValue,
            'Model.General.Profiles[0].PIRegulator.IValue': config.profiles[0].PIRegulatorIValue,

            'Model.General.Profiles[1].Name': config.profiles[1].Name,
            'Model.General.Profiles[1].Flags.Material': enumMaterial[config.profiles[1].Material],
            'Model.General.Profiles[1].Flags.IsTemperatureDominant': config.profiles[1].IsTemperatureDominant,
            'Model.General.Profiles[1].Flags.IsResistanceLocked': config.profiles[1].IsResistanceLocked,
            'Model.General.Profiles[1].Flags.IsEnabled': config.profiles[1].IsEnabled,
            'Model.General.Profiles[1].Flags2.IsPIEnabled': config.profiles[1].IsPIEnabled,
            'Model.General.Profiles[1].Flags2.IsPowerStep1W': config.profiles[1].IsPowerStep1W,
            'Model.General.Profiles[1].Flags2.IsTemperatureStep1C2F': config.profiles[1].IsTemperatureStep1C2F,
            'Model.General.Profiles[1].Power': Math.round(config.profiles[1].Power * 10),
            'Model.General.Profiles[1].PreheatType': enumPreheatType[config.profiles[1].PreheatType],
            'Model.General.Profiles[1].SelectedCurve': config.profiles[1].SelectedCurve,
            'Model.General.Profiles[1].PreheatTime': config.profiles[1].PreheatTime,
            'Model.General.Profiles[1].PreheatDelay': config.profiles[1].PreheatDelay,
            'Model.General.Profiles[1].PreheatPower': config.profiles[1].PreheatPower,
            'Model.General.Profiles[1].Temperature': config.profiles[1].Temperature,
            'Model.General.Profiles[1].Resistance': config.profiles[1].Resistance,
            'Model.General.Profiles[1].TCR': config.profiles[1].TCR,
            'Model.General.Profiles[1].PIRegulator.Range': config.profiles[1].PIRegulatorRange,
            'Model.General.Profiles[1].PIRegulator.PValue': config.profiles[1].PIRegulatorPValue,
            'Model.General.Profiles[1].PIRegulator.IValue': config.profiles[1].PIRegulatorIValue,

            'Model.General.Profiles[2].Name': config.profiles[2].Name,
            'Model.General.Profiles[2].Flags.Material': enumMaterial[config.profiles[2].Material],
            'Model.General.Profiles[2].Flags.IsTemperatureDominant': config.profiles[2].IsTemperatureDominant,
            'Model.General.Profiles[2].Flags.IsResistanceLocked': config.profiles[2].IsResistanceLocked,
            'Model.General.Profiles[2].Flags.IsEnabled': config.profiles[2].IsEnabled,
            'Model.General.Profiles[2].Flags2.IsPIEnabled': config.profiles[2].IsPIEnabled,
            'Model.General.Profiles[2].Flags2.IsPowerStep1W': config.profiles[2].IsPowerStep1W,
            'Model.General.Profiles[2].Flags2.IsTemperatureStep1C2F': config.profiles[2].IsTemperatureStep1C2F,
            'Model.General.Profiles[2].Power': Math.round(config.profiles[2].Power * 10),
            'Model.General.Profiles[2].PreheatType': enumPreheatType[config.profiles[2].PreheatType],
            'Model.General.Profiles[2].SelectedCurve': config.profiles[2].SelectedCurve,
            'Model.General.Profiles[2].PreheatTime': config.profiles[2].PreheatTime,
            'Model.General.Profiles[2].PreheatDelay': config.profiles[2].PreheatDelay,
            'Model.General.Profiles[2].PreheatPower': config.profiles[2].PreheatPower,
            'Model.General.Profiles[2].Temperature': config.profiles[2].Temperature,
            'Model.General.Profiles[2].Resistance': config.profiles[2].Resistance,
            'Model.General.Profiles[2].TCR': config.profiles[2].TCR,
            'Model.General.Profiles[2].PIRegulator.Range': config.profiles[2].PIRegulatorRange,
            'Model.General.Profiles[2].PIRegulator.PValue': config.profiles[2].PIRegulatorPValue,
            'Model.General.Profiles[2].PIRegulator.IValue': config.profiles[2].PIRegulatorIValue,

            'Model.General.Profiles[3].Name': config.profiles[3].Name,
            'Model.General.Profiles[3].Flags.Material': enumMaterial[config.profiles[3].Material],
            'Model.General.Profiles[3].Flags.IsTemperatureDominant': config.profiles[3].IsTemperatureDominant,
            'Model.General.Profiles[3].Flags.IsResistanceLocked': config.profiles[3].IsResistanceLocked,
            'Model.General.Profiles[3].Flags.IsEnabled': config.profiles[3].IsEnabled,
            'Model.General.Profiles[3].Flags2.IsPIEnabled': config.profiles[3].IsPIEnabled,
            'Model.General.Profiles[3].Flags2.IsPowerStep1W': config.profiles[3].IsPowerStep1W,
            'Model.General.Profiles[3].Flags2.IsTemperatureStep1C2F': config.profiles[3].IsTemperatureStep1C2F,
            'Model.General.Profiles[3].Power': Math.round(config.profiles[3].Power * 10),
            'Model.General.Profiles[3].PreheatType': enumPreheatType[config.profiles[3].PreheatType],
            'Model.General.Profiles[3].SelectedCurve': config.profiles[3].SelectedCurve,
            'Model.General.Profiles[3].PreheatTime': config.profiles[3].PreheatTime,
            'Model.General.Profiles[3].PreheatDelay': config.profiles[3].PreheatDelay,
            'Model.General.Profiles[3].PreheatPower': config.profiles[3].PreheatPower,
            'Model.General.Profiles[3].Temperature': config.profiles[3].Temperature,
            'Model.General.Profiles[3].Resistance': config.profiles[3].Resistance,
            'Model.General.Profiles[3].TCR': config.profiles[3].TCR,
            'Model.General.Profiles[3].PIRegulator.Range': config.profiles[3].PIRegulatorRange,
            'Model.General.Profiles[3].PIRegulator.PValue': config.profiles[3].PIRegulatorPValue,
            'Model.General.Profiles[3].PIRegulator.IValue': config.profiles[3].PIRegulatorIValue,

            'Model.General.Profiles[4].Name': config.profiles[4].Name,
            'Model.General.Profiles[4].Flags.Material': enumMaterial[config.profiles[4].Material],
            'Model.General.Profiles[4].Flags.IsTemperatureDominant': config.profiles[4].IsTemperatureDominant,
            'Model.General.Profiles[4].Flags.IsResistanceLocked': config.profiles[4].IsResistanceLocked,
            'Model.General.Profiles[4].Flags.IsEnabled': config.profiles[4].IsEnabled,
            'Model.General.Profiles[4].Flags2.IsPIEnabled': config.profiles[4].IsPIEnabled,
            'Model.General.Profiles[4].Flags2.IsPowerStep1W': config.profiles[4].IsPowerStep1W,
            'Model.General.Profiles[4].Flags2.IsTemperatureStep1C2F': config.profiles[4].IsTemperatureStep1C2F,
            'Model.General.Profiles[4].Power': Math.round(config.profiles[4].Power * 10),
            'Model.General.Profiles[4].PreheatType': enumPreheatType[config.profiles[4].PreheatType],
            'Model.General.Profiles[4].SelectedCurve': config.profiles[4].SelectedCurve,
            'Model.General.Profiles[4].PreheatTime': config.profiles[4].PreheatTime,
            'Model.General.Profiles[4].PreheatDelay': config.profiles[4].PreheatDelay,
            'Model.General.Profiles[4].PreheatPower': config.profiles[4].PreheatPower,
            'Model.General.Profiles[4].Temperature': config.profiles[4].Temperature,
            'Model.General.Profiles[4].Resistance': config.profiles[4].Resistance,
            'Model.General.Profiles[4].TCR': config.profiles[4].TCR,
            'Model.General.Profiles[4].PIRegulator.Range': config.profiles[4].PIRegulatorRange,
            'Model.General.Profiles[4].PIRegulator.PValue': config.profiles[4].PIRegulatorPValue,
            'Model.General.Profiles[4].PIRegulator.IValue': config.profiles[4].PIRegulatorIValue,

            'Model.General.Profiles[5].Name': config.profiles[5].Name,
            'Model.General.Profiles[5].Flags.Material': enumMaterial[config.profiles[5].Material],
            'Model.General.Profiles[5].Flags.IsTemperatureDominant': config.profiles[5].IsTemperatureDominant,
            'Model.General.Profiles[5].Flags.IsResistanceLocked': config.profiles[5].IsResistanceLocked,
            'Model.General.Profiles[5].Flags.IsEnabled': config.profiles[5].IsEnabled,
            'Model.General.Profiles[5].Flags2.IsPIEnabled': config.profiles[5].IsPIEnabled,
            'Model.General.Profiles[5].Flags2.IsPowerStep1W': config.profiles[5].IsPowerStep1W,
            'Model.General.Profiles[5].Flags2.IsTemperatureStep1C2F': config.profiles[5].IsTemperatureStep1C2F,
            'Model.General.Profiles[5].Power': Math.round(config.profiles[5].Power * 10),
            'Model.General.Profiles[5].PreheatType': enumPreheatType[config.profiles[5].PreheatType],
            'Model.General.Profiles[5].SelectedCurve': config.profiles[5].SelectedCurve,
            'Model.General.Profiles[5].PreheatTime': config.profiles[5].PreheatTime,
            'Model.General.Profiles[5].PreheatDelay': config.profiles[5].PreheatDelay,
            'Model.General.Profiles[5].PreheatPower': config.profiles[5].PreheatPower,
            'Model.General.Profiles[5].Temperature': config.profiles[5].Temperature,
            'Model.General.Profiles[5].Resistance': config.profiles[5].Resistance,
            'Model.General.Profiles[5].TCR': config.profiles[5].TCR,
            'Model.General.Profiles[5].PIRegulator.Range': config.profiles[5].PIRegulatorRange,
            'Model.General.Profiles[5].PIRegulator.PValue': config.profiles[5].PIRegulatorPValue,
            'Model.General.Profiles[5].PIRegulator.IValue': config.profiles[5].PIRegulatorIValue,

            'Model.General.Profiles[6].Name': config.profiles[6].Name,
            'Model.General.Profiles[6].Flags.Material': enumMaterial[config.profiles[6].Material],
            'Model.General.Profiles[6].Flags.IsTemperatureDominant': config.profiles[6].IsTemperatureDominant,
            'Model.General.Profiles[6].Flags.IsResistanceLocked': config.profiles[6].IsResistanceLocked,
            'Model.General.Profiles[6].Flags.IsEnabled': config.profiles[6].IsEnabled,
            'Model.General.Profiles[6].Flags2.IsPIEnabled': config.profiles[6].IsPIEnabled,
            'Model.General.Profiles[6].Flags2.IsPowerStep1W': config.profiles[6].IsPowerStep1W,
            'Model.General.Profiles[6].Flags2.IsTemperatureStep1C2F': config.profiles[6].IsTemperatureStep1C2F,
            'Model.General.Profiles[6].Power': Math.round(config.profiles[6].Power * 10),
            'Model.General.Profiles[6].PreheatType': enumPreheatType[config.profiles[6].PreheatType],
            'Model.General.Profiles[6].SelectedCurve': config.profiles[6].SelectedCurve,
            'Model.General.Profiles[6].PreheatTime': config.profiles[6].PreheatTime,
            'Model.General.Profiles[6].PreheatDelay': config.profiles[6].PreheatDelay,
            'Model.General.Profiles[6].PreheatPower': config.profiles[6].PreheatPower,
            'Model.General.Profiles[6].Temperature': config.profiles[6].Temperature,
            'Model.General.Profiles[6].Resistance': config.profiles[6].Resistance,
            'Model.General.Profiles[6].TCR': config.profiles[6].TCR,
            'Model.General.Profiles[6].PIRegulator.Range': config.profiles[6].PIRegulatorRange,
            'Model.General.Profiles[6].PIRegulator.PValue': config.profiles[6].PIRegulatorPValue,
            'Model.General.Profiles[6].PIRegulator.IValue': config.profiles[6].PIRegulatorIValue,

            'Model.General.Profiles[7].Name': config.profiles[7].Name,
            'Model.General.Profiles[7].Flags.Material': enumMaterial[config.profiles[7].Material],
            'Model.General.Profiles[7].Flags.IsTemperatureDominant': config.profiles[7].IsTemperatureDominant,
            'Model.General.Profiles[7].Flags.IsResistanceLocked': config.profiles[7].IsResistanceLocked,
            'Model.General.Profiles[7].Flags.IsEnabled': config.profiles[7].IsEnabled,
            'Model.General.Profiles[7].Flags2.IsPIEnabled': config.profiles[7].IsPIEnabled,
            'Model.General.Profiles[7].Flags2.IsPowerStep1W': config.profiles[7].IsPowerStep1W,
            'Model.General.Profiles[7].Flags2.IsTemperatureStep1C2F': config.profiles[7].IsTemperatureStep1C2F,
            'Model.General.Profiles[7].Power': Math.round(config.profiles[7].Power * 10),
            'Model.General.Profiles[7].PreheatType': enumPreheatType[config.profiles[7].PreheatType],
            'Model.General.Profiles[7].SelectedCurve': config.profiles[7].SelectedCurve,
            'Model.General.Profiles[7].PreheatTime': config.profiles[7].PreheatTime,
            'Model.General.Profiles[7].PreheatDelay': config.profiles[7].PreheatDelay,
            'Model.General.Profiles[7].PreheatPower': config.profiles[7].PreheatPower,
            'Model.General.Profiles[7].Temperature': config.profiles[7].Temperature,
            'Model.General.Profiles[7].Resistance': config.profiles[7].Resistance,
            'Model.General.Profiles[7].TCR': config.profiles[7].TCR,
            'Model.General.Profiles[7].PIRegulator.Range': config.profiles[7].PIRegulatorRange,
            'Model.General.Profiles[7].PIRegulator.PValue': config.profiles[7].PIRegulatorPValue,
            'Model.General.Profiles[7].PIRegulator.IValue': config.profiles[7].PIRegulatorIValue,

            'Model.General.SelectedProfile': config.SelectedProfile,
            'Model.General.SmartMode': enumSmartMode[config.SmartMode],
            'Model.General.SmartRange': config.SmartRange,

            'Model.Interface.Brightness': Math.round(config.Brightness * 2.55),
            'Model.Interface.IsFlipped': config.IsFlipped,
            'Model.Interface.IsLogoEnabled': config.IsLogoEnabled,
            'Model.Interface.IsClockOnMainScreen': config.IsClockOnMainScreen,
            'Model.Interface.ClockType': enumClockType[config.ClockType],
            'Model.Interface.DimTimeout': config.DimTimeout,
            'Model.Interface.DimTimeoutLocked': config.DimTimeoutLocked,
            'Model.Interface.DimTimeoutCharging': config.DimTimeoutCharging,
            'Model.Interface.ShowLogoDelay': config.ShowLogoDelay,
            'Model.Interface.ShowClockDelay': config.ShowClockDelay,
            'Model.Interface.ScreensaveDuration': config.ScreensaveDuration,
            'Model.Interface.PuffScreenDelay': Math.round(config.PuffScreenDelay * 10),

            'Model.Interface.ClicksVW[0]': enumClickAction[config.ClicksVW0],
            'Model.Interface.ClicksVW[1]': enumClickAction[config.ClicksVW1],
            'Model.Interface.ClicksVW[2]': enumClickAction[config.ClicksVW2],

            'Model.Interface.ClicksTC[0]': enumClickAction[config.ClicksTC0],
            'Model.Interface.ClicksTC[1]': enumClickAction[config.ClicksTC1],
            'Model.Interface.ClicksTC[2]': enumClickAction[config.ClicksTC2],

            'Model.Interface.FiveClicks': enumFiveClicks[config.FiveClicks],

            'Model.Interface.ShortcutsVW[0].InStandby': enumClickAction[config.ShortcutsVW0InStandby],
            'Model.Interface.ShortcutsVW[0].InEditMain': enumShortcutsInEdit[config.ShortcutsVW0InEditMain],
            'Model.Interface.ShortcutsVW[0].InSelector': enumShortcutsInSelector[config.ShortcutsVW0InSelector],
            'Model.Interface.ShortcutsVW[0].InMenu': enumShortcutsInMenu[config.ShortcutsVW0InMenu],

            'Model.Interface.ShortcutsVW[1].InStandby': enumClickAction[config.ShortcutsVW1InStandby],
            'Model.Interface.ShortcutsVW[1].InEditMain': enumShortcutsInEdit[config.ShortcutsVW1InEditMain],
            'Model.Interface.ShortcutsVW[1].InSelector': enumShortcutsInSelector[config.ShortcutsVW1InSelector],
            'Model.Interface.ShortcutsVW[1].InMenu': enumShortcutsInMenu[config.ShortcutsVW1InMenu],

            'Model.Interface.ShortcutsVW[2].InStandby': enumClickAction[config.ShortcutsVW2InStandby],
            'Model.Interface.ShortcutsVW[2].InEditMain': enumShortcutsInEdit[config.ShortcutsVW2InEditMain],
            'Model.Interface.ShortcutsVW[2].InSelector': enumShortcutsInSelector[config.ShortcutsVW2InSelector],
            'Model.Interface.ShortcutsVW[2].InMenu': enumShortcutsInMenu[config.ShortcutsVW2InMenu],

            'Model.Interface.ShortcutsTC[0].InStandby': enumClickAction[config.ShortcutsTC0InStandby],
            'Model.Interface.ShortcutsTC[0].InEditMain': enumShortcutsInEdit[config.ShortcutsTC0InEditMain],
            'Model.Interface.ShortcutsTC[0].InSelector': enumShortcutsInSelector[config.ShortcutsTC0InSelector],
            'Model.Interface.ShortcutsTC[0].InMenu': enumShortcutsInMenu[config.ShortcutsTC0InMenu],

            'Model.Interface.ShortcutsTC[1].InStandby': enumClickAction[config.ShortcutsTC1InStandby],
            'Model.Interface.ShortcutsTC[1].InEditMain': enumShortcutsInEdit[config.ShortcutsTC1InEditMain],
            'Model.Interface.ShortcutsTC[1].InSelector': enumShortcutsInSelector[config.ShortcutsTC1InSelector],
            'Model.Interface.ShortcutsTC[1].InMenu': enumShortcutsInMenu[config.ShortcutsTC1InMenu],

            'Model.Interface.ShortcutsTC[2].InStandby': enumClickAction[config.ShortcutsTC2InStandby],
            'Model.Interface.ShortcutsTC[2].InEditMain': enumShortcutsInEdit[config.ShortcutsTC2InEditMain],
            'Model.Interface.ShortcutsTC[2].InSelector': enumShortcutsInSelector[config.ShortcutsTC2InSelector],
            'Model.Interface.ShortcutsTC[2].InMenu': enumShortcutsInMenu[config.ShortcutsTC2InMenu],

            'Model.Interface.WakeUpByPlusMinus': config.WakeUpByPlusMinus,
            'Model.Interface.IsUpDownSwapped': config.IsUpDownSwapped,
            'Model.Interface.MainScreenSkin': enumSkin[config.MainScreenSkin],

            'Model.Interface.ClassicSkinVWLines.Line1': () => classicLineContent('ClassicSkinVWLine1'),
            'Model.Interface.ClassicSkinVWLines.Line2': () => classicLineContent('ClassicSkinVWLine2'),
            'Model.Interface.ClassicSkinVWLines.Line3': () => classicLineContent('ClassicSkinVWLine3'),
            'Model.Interface.ClassicSkinVWLines.Line4': () => classicLineContent('ClassicSkinVWLine4'),

            'Model.Interface.ClassicSkinTCLines.Line1': () => classicLineContent('ClassicSkinTCLine1'),
            'Model.Interface.ClassicSkinTCLines.Line2': () => classicLineContent('ClassicSkinTCLine2'),
            'Model.Interface.ClassicSkinTCLines.Line3': () => classicLineContent('ClassicSkinTCLine3'),
            'Model.Interface.ClassicSkinTCLines.Line4': () => classicLineContent('ClassicSkinTCLine4'),

            'Model.Interface.CircleSkinVWLines.Line1': () => circleLineContent('CircleSkinVWLine1'),
            'Model.Interface.CircleSkinVWLines.Line2': () => circleLineContent('CircleSkinVWLine2'),
            'Model.Interface.CircleSkinVWLines.Line3': () => circleLineContent('CircleSkinVWLine3'),

            'Model.Interface.CircleSkinTCLines.Line1': () => circleLineContent('CircleSkinTCLine1'),
            'Model.Interface.CircleSkinTCLines.Line2': () => circleLineContent('CircleSkinTCLine2'),
            'Model.Interface.CircleSkinTCLines.Line3': () => circleLineContent('CircleSkinTCLine3'),

            'Model.Interface.FoxySkinVWLines.Line1': () => foxyLineContent('FoxySkinVWLine1'),
            'Model.Interface.FoxySkinVWLines.Line2': () => foxyLineContent('FoxySkinVWLine2'),
            'Model.Interface.FoxySkinVWLines.Line3': () => foxyLineContent('FoxySkinVWLine3'),

            'Model.Interface.FoxySkinTCLines.Line1': () => foxyLineContent('FoxySkinTCLine1'),
            'Model.Interface.FoxySkinTCLines.Line2': () => foxyLineContent('FoxySkinTCLine2'),
            'Model.Interface.FoxySkinTCLines.Line3': () => foxyLineContent('FoxySkinTCLine3'),

            'Model.Interface.SmallSkinVWLines.Line1': () => smallLineContent('SmallSkinVWLine1'),
            'Model.Interface.SmallSkinVWLines.Line2': () => smallLineContent('SmallSkinVWLine2'),

            'Model.Interface.SmallSkinTCLines.Line1': () => smallLineContent('SmallSkinTCLine1'),
            'Model.Interface.SmallSkinTCLines.Line2': () => smallLineContent('SmallSkinTCLine2'),

            'Model.Interface.MediumSkinVWLines.Line1': () => classicLineContent('MediumSkinVWLine1'),
            'Model.Interface.MediumSkinVWLines.Line2': () => classicLineContent('MediumSkinVWLine2'),
            'Model.Interface.MediumSkinVWLines.Line3': () => classicLineContent('MediumSkinVWLine3'),

            'Model.Interface.MediumSkinTCLines.Line1': () => classicLineContent('MediumSkinTCLine1'),
            'Model.Interface.MediumSkinTCLines.Line2': () => classicLineContent('MediumSkinTCLine2'),
            'Model.Interface.MediumSkinTCLines.Line3': () => classicLineContent('MediumSkinTCLine3'),

            'Model.Interface.TemperatureUnits': enumTemperatureUnits[config.TemperatureUnits],
            'Model.Interface.DateFormat': enumDateFormat[config.DateFormat],
            'Model.Interface.TimeFormat': enumTimeFormat[config.TimeFormat],

            'Model.Interface.PuffsTimeFormat': enumPuffsTimeFormat[config.PuffsTimeFormat],
            'Model.Interface.ChargeScreenType': enumChargeScreenType[config.ChargeScreenType],
            'Model.Interface.ChargeExtraType': enumChargeExtraType[config.ChargeExtraType],
            'Model.Interface.IsStealthMode': config.IsStealthMode,
            'Model.Interface.ShowChargingInStealth': config.ShowChargingInStealth,
            'Model.Interface.ShowScreensaverInStealth': config.ShowScreensaverInStealth,
            'Model.Interface.ClockOnClickInStealth': config.ClockOnClickInStealth,

            'Model.Counters.PuffsCount': config.PuffsCount,
            'Model.Counters.PuffsTime': config.PuffsTime,
            'Model.Counters.DateTime.Year': config.Year,
            'Model.Counters.DateTime.Month': config.Month,
            'Model.Counters.DateTime.Day': config.Day,
            'Model.Counters.DateTime.Hour': config.Hour,
            'Model.Counters.DateTime.Minute': config.Minute,
            'Model.Counters.DateTime.Second': config.Second,

            'Model.Advanced.PowerLimit': Math.round(config.PowerLimit * 10),
            'Model.Advanced.PuffCutOff': Math.round(config.PuffCutOff * 10),

            'Model.Advanced.BatteryVoltageOffsets[0]': config.BatteryVoltageOffset1,
            'Model.Advanced.BatteryVoltageOffsets[1]': config.BatteryVoltageOffset2,
            'Model.Advanced.BatteryVoltageOffsets[2]': config.BatteryVoltageOffset3,
            'Model.Advanced.BatteryVoltageOffsets[3]': config.BatteryVoltageOffset4,

            'Model.Advanced.RtcMode': enumRtcMode[config.RtcMode],
            'Model.Advanced.IsUsbCharge': config.IsUsbCharge,
            'Model.Advanced.UsbNoSleep': config.UsbNoSleep,
            'Model.Advanced.ChargingCurrent': config.ChargingCurrent,
            'Model.Advanced.ResetCountersOnStartup': config.ResetCountersOnStartup,

            'Model.Advanced.ShuntCorrection': config.ShuntCorrection,
            'Model.Advanced.InternalResistance': config.InternalResistance,

            'Model.Advanced.BatteryModel': enumBatteryModel[config.BatteryModel],


            'Model.Advanced.CustomBatteryProfiles[0].Name': config.CustomBatteryProfiles[0].Name,
            'Model.Advanced.CustomBatteryProfiles[0].Data[0].Percents': config.CustomBatteryProfiles[0].PercentsVoltage[0].Percents,
            'Model.Advanced.CustomBatteryProfiles[0].Data[0].Voltage': Math.round(config.CustomBatteryProfiles[0].PercentsVoltage[0].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[0].Data[1].Percents': config.CustomBatteryProfiles[0].PercentsVoltage[1].Percents,
            'Model.Advanced.CustomBatteryProfiles[0].Data[1].Voltage': Math.round(config.CustomBatteryProfiles[0].PercentsVoltage[1].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[0].Data[2].Percents': config.CustomBatteryProfiles[0].PercentsVoltage[2].Percents,
            'Model.Advanced.CustomBatteryProfiles[0].Data[2].Voltage': Math.round(config.CustomBatteryProfiles[0].PercentsVoltage[2].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[0].Data[3].Percents': config.CustomBatteryProfiles[0].PercentsVoltage[3].Percents,
            'Model.Advanced.CustomBatteryProfiles[0].Data[3].Voltage': Math.round(config.CustomBatteryProfiles[0].PercentsVoltage[3].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[0].Data[4].Percents': config.CustomBatteryProfiles[0].PercentsVoltage[4].Percents,
            'Model.Advanced.CustomBatteryProfiles[0].Data[4].Voltage': Math.round(config.CustomBatteryProfiles[0].PercentsVoltage[4].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[0].Data[5].Percents': config.CustomBatteryProfiles[0].PercentsVoltage[5].Percents,
            'Model.Advanced.CustomBatteryProfiles[0].Data[5].Voltage': Math.round(config.CustomBatteryProfiles[0].PercentsVoltage[5].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[0].Data[6].Percents': config.CustomBatteryProfiles[0].PercentsVoltage[6].Percents,
            'Model.Advanced.CustomBatteryProfiles[0].Data[6].Voltage': Math.round(config.CustomBatteryProfiles[0].PercentsVoltage[6].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[0].Data[7].Percents': config.CustomBatteryProfiles[0].PercentsVoltage[7].Percents,
            'Model.Advanced.CustomBatteryProfiles[0].Data[7].Voltage': Math.round(config.CustomBatteryProfiles[0].PercentsVoltage[7].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[0].Data[8].Percents': config.CustomBatteryProfiles[0].PercentsVoltage[8].Percents,
            'Model.Advanced.CustomBatteryProfiles[0].Data[8].Voltage': Math.round(config.CustomBatteryProfiles[0].PercentsVoltage[8].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[0].Data[9].Percents': config.CustomBatteryProfiles[0].PercentsVoltage[9].Percents,
            'Model.Advanced.CustomBatteryProfiles[0].Data[9].Voltage': Math.round(config.CustomBatteryProfiles[0].PercentsVoltage[9].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[0].Data[10].Percents': config.CustomBatteryProfiles[0].PercentsVoltage[10].Percents,
            'Model.Advanced.CustomBatteryProfiles[0].Data[10].Voltage': Math.round(config.CustomBatteryProfiles[0].PercentsVoltage[10].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[0].Cutoff': Math.round(config.CustomBatteryProfiles[0].Cutoff * 100),

            'Model.Advanced.CustomBatteryProfiles[1].Name': config.CustomBatteryProfiles[1].Name,
            'Model.Advanced.CustomBatteryProfiles[1].Data[0].Percents': config.CustomBatteryProfiles[1].PercentsVoltage[0].Percents,
            'Model.Advanced.CustomBatteryProfiles[1].Data[0].Voltage': Math.round(config.CustomBatteryProfiles[1].PercentsVoltage[0].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[1].Data[1].Percents': config.CustomBatteryProfiles[1].PercentsVoltage[1].Percents,
            'Model.Advanced.CustomBatteryProfiles[1].Data[1].Voltage': Math.round(config.CustomBatteryProfiles[1].PercentsVoltage[1].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[1].Data[2].Percents': config.CustomBatteryProfiles[1].PercentsVoltage[2].Percents,
            'Model.Advanced.CustomBatteryProfiles[1].Data[2].Voltage': Math.round(config.CustomBatteryProfiles[1].PercentsVoltage[2].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[1].Data[3].Percents': config.CustomBatteryProfiles[1].PercentsVoltage[3].Percents,
            'Model.Advanced.CustomBatteryProfiles[1].Data[3].Voltage': Math.round(config.CustomBatteryProfiles[1].PercentsVoltage[3].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[1].Data[4].Percents': config.CustomBatteryProfiles[1].PercentsVoltage[4].Percents,
            'Model.Advanced.CustomBatteryProfiles[1].Data[4].Voltage': Math.round(config.CustomBatteryProfiles[1].PercentsVoltage[4].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[1].Data[5].Percents': config.CustomBatteryProfiles[1].PercentsVoltage[5].Percents,
            'Model.Advanced.CustomBatteryProfiles[1].Data[5].Voltage': Math.round(config.CustomBatteryProfiles[1].PercentsVoltage[5].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[1].Data[6].Percents': config.CustomBatteryProfiles[1].PercentsVoltage[6].Percents,
            'Model.Advanced.CustomBatteryProfiles[1].Data[6].Voltage': Math.round(config.CustomBatteryProfiles[1].PercentsVoltage[6].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[1].Data[7].Percents': config.CustomBatteryProfiles[1].PercentsVoltage[7].Percents,
            'Model.Advanced.CustomBatteryProfiles[1].Data[7].Voltage': Math.round(config.CustomBatteryProfiles[1].PercentsVoltage[7].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[1].Data[8].Percents': config.CustomBatteryProfiles[1].PercentsVoltage[8].Percents,
            'Model.Advanced.CustomBatteryProfiles[1].Data[8].Voltage': Math.round(config.CustomBatteryProfiles[1].PercentsVoltage[8].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[1].Data[9].Percents': config.CustomBatteryProfiles[1].PercentsVoltage[9].Percents,
            'Model.Advanced.CustomBatteryProfiles[1].Data[9].Voltage': Math.round(config.CustomBatteryProfiles[1].PercentsVoltage[9].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[1].Data[10].Percents': config.CustomBatteryProfiles[1].PercentsVoltage[10].Percents,
            'Model.Advanced.CustomBatteryProfiles[1].Data[10].Voltage': Math.round(config.CustomBatteryProfiles[1].PercentsVoltage[10].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[1].Cutoff': Math.round(config.CustomBatteryProfiles[1].Cutoff * 100),

            'Model.Advanced.CustomBatteryProfiles[2].Name': config.CustomBatteryProfiles[2].Name,
            'Model.Advanced.CustomBatteryProfiles[2].Data[0].Percents': config.CustomBatteryProfiles[2].PercentsVoltage[0].Percents,
            'Model.Advanced.CustomBatteryProfiles[2].Data[0].Voltage': Math.round(config.CustomBatteryProfiles[2].PercentsVoltage[0].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[2].Data[1].Percents': config.CustomBatteryProfiles[2].PercentsVoltage[1].Percents,
            'Model.Advanced.CustomBatteryProfiles[2].Data[1].Voltage': Math.round(config.CustomBatteryProfiles[2].PercentsVoltage[1].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[2].Data[2].Percents': config.CustomBatteryProfiles[2].PercentsVoltage[2].Percents,
            'Model.Advanced.CustomBatteryProfiles[2].Data[2].Voltage': Math.round(config.CustomBatteryProfiles[2].PercentsVoltage[2].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[2].Data[3].Percents': config.CustomBatteryProfiles[2].PercentsVoltage[3].Percents,
            'Model.Advanced.CustomBatteryProfiles[2].Data[3].Voltage': Math.round(config.CustomBatteryProfiles[2].PercentsVoltage[3].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[2].Data[4].Percents': config.CustomBatteryProfiles[2].PercentsVoltage[4].Percents,
            'Model.Advanced.CustomBatteryProfiles[2].Data[4].Voltage': Math.round(config.CustomBatteryProfiles[2].PercentsVoltage[4].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[2].Data[5].Percents': config.CustomBatteryProfiles[2].PercentsVoltage[5].Percents,
            'Model.Advanced.CustomBatteryProfiles[2].Data[5].Voltage': Math.round(config.CustomBatteryProfiles[2].PercentsVoltage[5].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[2].Data[6].Percents': config.CustomBatteryProfiles[2].PercentsVoltage[6].Percents,
            'Model.Advanced.CustomBatteryProfiles[2].Data[6].Voltage': Math.round(config.CustomBatteryProfiles[2].PercentsVoltage[6].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[2].Data[7].Percents': config.CustomBatteryProfiles[2].PercentsVoltage[7].Percents,
            'Model.Advanced.CustomBatteryProfiles[2].Data[7].Voltage': Math.round(config.CustomBatteryProfiles[2].PercentsVoltage[7].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[2].Data[8].Percents': config.CustomBatteryProfiles[2].PercentsVoltage[8].Percents,
            'Model.Advanced.CustomBatteryProfiles[2].Data[8].Voltage': Math.round(config.CustomBatteryProfiles[2].PercentsVoltage[8].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[2].Data[9].Percents': config.CustomBatteryProfiles[2].PercentsVoltage[9].Percents,
            'Model.Advanced.CustomBatteryProfiles[2].Data[9].Voltage': Math.round(config.CustomBatteryProfiles[2].PercentsVoltage[9].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[2].Data[10].Percents': config.CustomBatteryProfiles[2].PercentsVoltage[10].Percents,
            'Model.Advanced.CustomBatteryProfiles[2].Data[10].Voltage': Math.round(config.CustomBatteryProfiles[2].PercentsVoltage[10].Voltage * 100),
            'Model.Advanced.CustomBatteryProfiles[2].Cutoff': Math.round(config.CustomBatteryProfiles[2].Cutoff * 100),


            'Model.Advanced.TFRTables[0].Name': config.TFRTables[0].Name,
            'Model.Advanced.TFRTables[0].Points[0].Temperature': config.TFRTables[0].Points[0].Temperature,
            'Model.Advanced.TFRTables[0].Points[0].Factor': Math.round(config.TFRTables[0].Points[0].Factor * 10000),
            'Model.Advanced.TFRTables[0].Points[1].Temperature': config.TFRTables[0].Points[1].Temperature,
            'Model.Advanced.TFRTables[0].Points[1].Factor': Math.round(config.TFRTables[0].Points[1].Factor * 10000),
            'Model.Advanced.TFRTables[0].Points[2].Temperature': config.TFRTables[0].Points[2].Temperature,
            'Model.Advanced.TFRTables[0].Points[2].Factor': Math.round(config.TFRTables[0].Points[2].Factor * 10000),
            'Model.Advanced.TFRTables[0].Points[3].Temperature': config.TFRTables[0].Points[3].Temperature,
            'Model.Advanced.TFRTables[0].Points[3].Factor': Math.round(config.TFRTables[0].Points[3].Factor * 10000),
            'Model.Advanced.TFRTables[0].Points[4].Temperature': config.TFRTables[0].Points[4].Temperature,
            'Model.Advanced.TFRTables[0].Points[4].Factor': Math.round(config.TFRTables[0].Points[4].Factor * 10000),
            'Model.Advanced.TFRTables[0].Points[5].Temperature': config.TFRTables[0].Points[5].Temperature,
            'Model.Advanced.TFRTables[0].Points[5].Factor': Math.round(config.TFRTables[0].Points[5].Factor * 10000),
            'Model.Advanced.TFRTables[0].Points[6].Temperature': config.TFRTables[0].Points[6].Temperature,
            'Model.Advanced.TFRTables[0].Points[6].Factor': Math.round(config.TFRTables[0].Points[6].Factor * 10000),
            'Model.Advanced.TFRTables[1].Name': config.TFRTables[1].Name,
            'Model.Advanced.TFRTables[1].Points[0].Temperature': config.TFRTables[1].Points[0].Temperature,
            'Model.Advanced.TFRTables[1].Points[0].Factor': Math.round(config.TFRTables[1].Points[0].Factor * 10000),
            'Model.Advanced.TFRTables[1].Points[1].Temperature': config.TFRTables[1].Points[1].Temperature,
            'Model.Advanced.TFRTables[1].Points[1].Factor': Math.round(config.TFRTables[1].Points[1].Factor * 10000),
            'Model.Advanced.TFRTables[1].Points[2].Temperature': config.TFRTables[1].Points[2].Temperature,
            'Model.Advanced.TFRTables[1].Points[2].Factor': Math.round(config.TFRTables[1].Points[2].Factor * 10000),
            'Model.Advanced.TFRTables[1].Points[3].Temperature': config.TFRTables[1].Points[3].Temperature,
            'Model.Advanced.TFRTables[1].Points[3].Factor': Math.round(config.TFRTables[1].Points[3].Factor * 10000),
            'Model.Advanced.TFRTables[1].Points[4].Temperature': config.TFRTables[1].Points[4].Temperature,
            'Model.Advanced.TFRTables[1].Points[4].Factor': Math.round(config.TFRTables[1].Points[4].Factor * 10000),
            'Model.Advanced.TFRTables[1].Points[5].Temperature': config.TFRTables[1].Points[5].Temperature,
            'Model.Advanced.TFRTables[1].Points[5].Factor': Math.round(config.TFRTables[1].Points[5].Factor * 10000),
            'Model.Advanced.TFRTables[1].Points[6].Temperature': config.TFRTables[1].Points[6].Temperature,
            'Model.Advanced.TFRTables[1].Points[6].Factor': Math.round(config.TFRTables[1].Points[6].Factor * 10000),
            'Model.Advanced.TFRTables[2].Name': config.TFRTables[2].Name,
            'Model.Advanced.TFRTables[2].Points[0].Temperature': config.TFRTables[2].Points[0].Temperature,
            'Model.Advanced.TFRTables[2].Points[0].Factor': Math.round(config.TFRTables[2].Points[0].Factor * 10000),
            'Model.Advanced.TFRTables[2].Points[1].Temperature': config.TFRTables[2].Points[1].Temperature,
            'Model.Advanced.TFRTables[2].Points[1].Factor': Math.round(config.TFRTables[2].Points[1].Factor * 10000),
            'Model.Advanced.TFRTables[2].Points[2].Temperature': config.TFRTables[2].Points[2].Temperature,
            'Model.Advanced.TFRTables[2].Points[2].Factor': Math.round(config.TFRTables[2].Points[2].Factor * 10000),
            'Model.Advanced.TFRTables[2].Points[3].Temperature': config.TFRTables[2].Points[3].Temperature,
            'Model.Advanced.TFRTables[2].Points[3].Factor': Math.round(config.TFRTables[2].Points[3].Factor * 10000),
            'Model.Advanced.TFRTables[2].Points[4].Temperature': config.TFRTables[2].Points[4].Temperature,
            'Model.Advanced.TFRTables[2].Points[4].Factor': Math.round(config.TFRTables[2].Points[4].Factor * 10000),
            'Model.Advanced.TFRTables[2].Points[5].Temperature': config.TFRTables[2].Points[5].Temperature,
            'Model.Advanced.TFRTables[2].Points[5].Factor': Math.round(config.TFRTables[2].Points[5].Factor * 10000),
            'Model.Advanced.TFRTables[2].Points[6].Temperature': config.TFRTables[2].Points[6].Temperature,
            'Model.Advanced.TFRTables[2].Points[6].Factor': Math.round(config.TFRTables[2].Points[6].Factor * 10000),
            'Model.Advanced.TFRTables[3].Name': config.TFRTables[3].Name,
            'Model.Advanced.TFRTables[3].Points[0].Temperature': config.TFRTables[3].Points[0].Temperature,
            'Model.Advanced.TFRTables[3].Points[0].Factor': Math.round(config.TFRTables[3].Points[0].Factor * 10000),
            'Model.Advanced.TFRTables[3].Points[1].Temperature': config.TFRTables[3].Points[1].Temperature,
            'Model.Advanced.TFRTables[3].Points[1].Factor': Math.round(config.TFRTables[3].Points[1].Factor * 10000),
            'Model.Advanced.TFRTables[3].Points[2].Temperature': config.TFRTables[3].Points[2].Temperature,
            'Model.Advanced.TFRTables[3].Points[2].Factor': Math.round(config.TFRTables[3].Points[2].Factor * 10000),
            'Model.Advanced.TFRTables[3].Points[3].Temperature': config.TFRTables[3].Points[3].Temperature,
            'Model.Advanced.TFRTables[3].Points[3].Factor': Math.round(config.TFRTables[3].Points[3].Factor * 10000),
            'Model.Advanced.TFRTables[3].Points[4].Temperature': config.TFRTables[3].Points[4].Temperature,
            'Model.Advanced.TFRTables[3].Points[4].Factor': Math.round(config.TFRTables[3].Points[4].Factor * 10000),
            'Model.Advanced.TFRTables[3].Points[5].Temperature': config.TFRTables[3].Points[5].Temperature,
            'Model.Advanced.TFRTables[3].Points[5].Factor': Math.round(config.TFRTables[3].Points[5].Factor * 10000),
            'Model.Advanced.TFRTables[3].Points[6].Temperature': config.TFRTables[3].Points[6].Temperature,
            'Model.Advanced.TFRTables[3].Points[6].Factor': Math.round(config.TFRTables[3].Points[6].Factor * 10000),
            'Model.Advanced.TFRTables[4].Name': config.TFRTables[4].Name,
            'Model.Advanced.TFRTables[4].Points[0].Temperature': config.TFRTables[4].Points[0].Temperature,
            'Model.Advanced.TFRTables[4].Points[0].Factor': Math.round(config.TFRTables[4].Points[0].Factor * 10000),
            'Model.Advanced.TFRTables[4].Points[1].Temperature': config.TFRTables[4].Points[1].Temperature,
            'Model.Advanced.TFRTables[4].Points[1].Factor': Math.round(config.TFRTables[4].Points[1].Factor * 10000),
            'Model.Advanced.TFRTables[4].Points[2].Temperature': config.TFRTables[4].Points[2].Temperature,
            'Model.Advanced.TFRTables[4].Points[2].Factor': Math.round(config.TFRTables[4].Points[2].Factor * 10000),
            'Model.Advanced.TFRTables[4].Points[3].Temperature': config.TFRTables[4].Points[3].Temperature,
            'Model.Advanced.TFRTables[4].Points[3].Factor': Math.round(config.TFRTables[4].Points[3].Factor * 10000),
            'Model.Advanced.TFRTables[4].Points[4].Temperature': config.TFRTables[4].Points[4].Temperature,
            'Model.Advanced.TFRTables[4].Points[4].Factor': Math.round(config.TFRTables[4].Points[4].Factor * 10000),
            'Model.Advanced.TFRTables[4].Points[5].Temperature': config.TFRTables[4].Points[5].Temperature,
            'Model.Advanced.TFRTables[4].Points[5].Factor': Math.round(config.TFRTables[4].Points[5].Factor * 10000),
            'Model.Advanced.TFRTables[4].Points[6].Temperature': config.TFRTables[4].Points[6].Temperature,
            'Model.Advanced.TFRTables[4].Points[6].Factor': Math.round(config.TFRTables[4].Points[6].Factor * 10000),
            'Model.Advanced.TFRTables[5].Name': config.TFRTables[5].Name,
            'Model.Advanced.TFRTables[5].Points[0].Temperature': config.TFRTables[5].Points[0].Temperature,
            'Model.Advanced.TFRTables[5].Points[0].Factor': Math.round(config.TFRTables[5].Points[0].Factor * 10000),
            'Model.Advanced.TFRTables[5].Points[1].Temperature': config.TFRTables[5].Points[1].Temperature,
            'Model.Advanced.TFRTables[5].Points[1].Factor': Math.round(config.TFRTables[5].Points[1].Factor * 10000),
            'Model.Advanced.TFRTables[5].Points[2].Temperature': config.TFRTables[5].Points[2].Temperature,
            'Model.Advanced.TFRTables[5].Points[2].Factor': Math.round(config.TFRTables[5].Points[2].Factor * 10000),
            'Model.Advanced.TFRTables[5].Points[3].Temperature': config.TFRTables[5].Points[3].Temperature,
            'Model.Advanced.TFRTables[5].Points[3].Factor': Math.round(config.TFRTables[5].Points[3].Factor * 10000),
            'Model.Advanced.TFRTables[5].Points[4].Temperature': config.TFRTables[5].Points[4].Temperature,
            'Model.Advanced.TFRTables[5].Points[4].Factor': Math.round(config.TFRTables[5].Points[4].Factor * 10000),
            'Model.Advanced.TFRTables[5].Points[5].Temperature': config.TFRTables[5].Points[5].Temperature,
            'Model.Advanced.TFRTables[5].Points[5].Factor': Math.round(config.TFRTables[5].Points[5].Factor * 10000),
            'Model.Advanced.TFRTables[5].Points[6].Temperature': config.TFRTables[5].Points[6].Temperature,
            'Model.Advanced.TFRTables[5].Points[6].Factor': Math.round(config.TFRTables[5].Points[6].Factor * 10000),
            'Model.Advanced.TFRTables[6].Name': config.TFRTables[6].Name,
            'Model.Advanced.TFRTables[6].Points[0].Temperature': config.TFRTables[6].Points[0].Temperature,
            'Model.Advanced.TFRTables[6].Points[0].Factor': Math.round(config.TFRTables[6].Points[0].Factor * 10000),
            'Model.Advanced.TFRTables[6].Points[1].Temperature': config.TFRTables[6].Points[1].Temperature,
            'Model.Advanced.TFRTables[6].Points[1].Factor': Math.round(config.TFRTables[6].Points[1].Factor * 10000),
            'Model.Advanced.TFRTables[6].Points[2].Temperature': config.TFRTables[6].Points[2].Temperature,
            'Model.Advanced.TFRTables[6].Points[2].Factor': Math.round(config.TFRTables[6].Points[2].Factor * 10000),
            'Model.Advanced.TFRTables[6].Points[3].Temperature': config.TFRTables[6].Points[3].Temperature,
            'Model.Advanced.TFRTables[6].Points[3].Factor': Math.round(config.TFRTables[6].Points[3].Factor * 10000),
            'Model.Advanced.TFRTables[6].Points[4].Temperature': config.TFRTables[6].Points[4].Temperature,
            'Model.Advanced.TFRTables[6].Points[4].Factor': Math.round(config.TFRTables[6].Points[4].Factor * 10000),
            'Model.Advanced.TFRTables[6].Points[5].Temperature': config.TFRTables[6].Points[5].Temperature,
            'Model.Advanced.TFRTables[6].Points[5].Factor': Math.round(config.TFRTables[6].Points[5].Factor * 10000),
            'Model.Advanced.TFRTables[6].Points[6].Temperature': config.TFRTables[6].Points[6].Temperature,
            'Model.Advanced.TFRTables[6].Points[6].Factor': Math.round(config.TFRTables[6].Points[6].Factor * 10000),
            'Model.Advanced.TFRTables[7].Name': config.TFRTables[7].Name,
            'Model.Advanced.TFRTables[7].Points[0].Temperature': config.TFRTables[7].Points[0].Temperature,
            'Model.Advanced.TFRTables[7].Points[0].Factor': Math.round(config.TFRTables[7].Points[0].Factor * 10000),
            'Model.Advanced.TFRTables[7].Points[1].Temperature': config.TFRTables[7].Points[1].Temperature,
            'Model.Advanced.TFRTables[7].Points[1].Factor': Math.round(config.TFRTables[7].Points[1].Factor * 10000),
            'Model.Advanced.TFRTables[7].Points[2].Temperature': config.TFRTables[7].Points[2].Temperature,
            'Model.Advanced.TFRTables[7].Points[2].Factor': Math.round(config.TFRTables[7].Points[2].Factor * 10000),
            'Model.Advanced.TFRTables[7].Points[3].Temperature': config.TFRTables[7].Points[3].Temperature,
            'Model.Advanced.TFRTables[7].Points[3].Factor': Math.round(config.TFRTables[7].Points[3].Factor * 10000),
            'Model.Advanced.TFRTables[7].Points[4].Temperature': config.TFRTables[7].Points[4].Temperature,
            'Model.Advanced.TFRTables[7].Points[4].Factor': Math.round(config.TFRTables[7].Points[4].Factor * 10000),
            'Model.Advanced.TFRTables[7].Points[5].Temperature': config.TFRTables[7].Points[5].Temperature,
            'Model.Advanced.TFRTables[7].Points[5].Factor': Math.round(config.TFRTables[7].Points[5].Factor * 10000),
            'Model.Advanced.TFRTables[7].Points[6].Temperature': config.TFRTables[7].Points[6].Temperature,
            'Model.Advanced.TFRTables[7].Points[6].Factor': Math.round(config.TFRTables[7].Points[6].Factor * 10000),

            'Model.Advanced.PowerCurves[0].Name': config.PowerCurves[0].Name,
            'Model.Advanced.PowerCurves[0].Points[0].Time': Math.round(config.PowerCurves[0].Points[0].Time * 10),
            'Model.Advanced.PowerCurves[0].Points[0].Percent': config.PowerCurves[0].Points[0].Percent,
            'Model.Advanced.PowerCurves[0].Points[1].Time': Math.round(config.PowerCurves[0].Points[1].Time * 10),
            'Model.Advanced.PowerCurves[0].Points[1].Percent': config.PowerCurves[0].Points[1].Percent,
            'Model.Advanced.PowerCurves[0].Points[2].Time': Math.round(config.PowerCurves[0].Points[2].Time * 10),
            'Model.Advanced.PowerCurves[0].Points[2].Percent': config.PowerCurves[0].Points[2].Percent,
            'Model.Advanced.PowerCurves[0].Points[3].Time': Math.round(config.PowerCurves[0].Points[3].Time * 10),
            'Model.Advanced.PowerCurves[0].Points[3].Percent': config.PowerCurves[0].Points[3].Percent,
            'Model.Advanced.PowerCurves[0].Points[4].Time': Math.round(config.PowerCurves[0].Points[4].Time * 10),
            'Model.Advanced.PowerCurves[0].Points[4].Percent': config.PowerCurves[0].Points[4].Percent,
            'Model.Advanced.PowerCurves[0].Points[5].Time': Math.round(config.PowerCurves[0].Points[5].Time * 10),
            'Model.Advanced.PowerCurves[0].Points[5].Percent': config.PowerCurves[0].Points[5].Percent,
            'Model.Advanced.PowerCurves[0].Points[6].Time': Math.round(config.PowerCurves[0].Points[6].Time * 10),
            'Model.Advanced.PowerCurves[0].Points[6].Percent': config.PowerCurves[0].Points[6].Percent,
            'Model.Advanced.PowerCurves[0].Points[7].Time': Math.round(config.PowerCurves[0].Points[7].Time * 10),
            'Model.Advanced.PowerCurves[0].Points[7].Percent': config.PowerCurves[0].Points[7].Percent,
            'Model.Advanced.PowerCurves[0].Points[8].Time': Math.round(config.PowerCurves[0].Points[8].Time * 10),
            'Model.Advanced.PowerCurves[0].Points[8].Percent': config.PowerCurves[0].Points[8].Percent,
            'Model.Advanced.PowerCurves[0].Points[9].Time': Math.round(config.PowerCurves[0].Points[9].Time * 10),
            'Model.Advanced.PowerCurves[0].Points[9].Percent': config.PowerCurves[0].Points[9].Percent,
            'Model.Advanced.PowerCurves[0].Points[10].Time': Math.round(config.PowerCurves[0].Points[10].Time * 10),
            'Model.Advanced.PowerCurves[0].Points[10].Percent': config.PowerCurves[0].Points[10].Percent,
            'Model.Advanced.PowerCurves[0].Points[11].Time': Math.round(config.PowerCurves[0].Points[11].Time * 10),
            'Model.Advanced.PowerCurves[0].Points[11].Percent': config.PowerCurves[0].Points[11].Percent,

            'Model.Advanced.PowerCurves[1].Name': config.PowerCurves[1].Name,
            'Model.Advanced.PowerCurves[1].Points[0].Time': Math.round(config.PowerCurves[1].Points[0].Time * 10),
            'Model.Advanced.PowerCurves[1].Points[0].Percent': config.PowerCurves[1].Points[0].Percent,
            'Model.Advanced.PowerCurves[1].Points[1].Time': Math.round(config.PowerCurves[1].Points[1].Time * 10),
            'Model.Advanced.PowerCurves[1].Points[1].Percent': config.PowerCurves[1].Points[1].Percent,
            'Model.Advanced.PowerCurves[1].Points[2].Time': Math.round(config.PowerCurves[1].Points[2].Time * 10),
            'Model.Advanced.PowerCurves[1].Points[2].Percent': config.PowerCurves[1].Points[2].Percent,
            'Model.Advanced.PowerCurves[1].Points[3].Time': Math.round(config.PowerCurves[1].Points[3].Time * 10),
            'Model.Advanced.PowerCurves[1].Points[3].Percent': config.PowerCurves[1].Points[3].Percent,
            'Model.Advanced.PowerCurves[1].Points[4].Time': Math.round(config.PowerCurves[1].Points[4].Time * 10),
            'Model.Advanced.PowerCurves[1].Points[4].Percent': config.PowerCurves[1].Points[4].Percent,
            'Model.Advanced.PowerCurves[1].Points[5].Time': Math.round(config.PowerCurves[1].Points[5].Time * 10),
            'Model.Advanced.PowerCurves[1].Points[5].Percent': config.PowerCurves[1].Points[5].Percent,
            'Model.Advanced.PowerCurves[1].Points[6].Time': Math.round(config.PowerCurves[1].Points[6].Time * 10),
            'Model.Advanced.PowerCurves[1].Points[6].Percent': config.PowerCurves[1].Points[6].Percent,
            'Model.Advanced.PowerCurves[1].Points[7].Time': Math.round(config.PowerCurves[1].Points[7].Time * 10),
            'Model.Advanced.PowerCurves[1].Points[7].Percent': config.PowerCurves[1].Points[7].Percent,
            'Model.Advanced.PowerCurves[1].Points[8].Time': Math.round(config.PowerCurves[1].Points[8].Time * 10),
            'Model.Advanced.PowerCurves[1].Points[8].Percent': config.PowerCurves[1].Points[8].Percent,
            'Model.Advanced.PowerCurves[1].Points[9].Time': Math.round(config.PowerCurves[1].Points[9].Time * 10),
            'Model.Advanced.PowerCurves[1].Points[9].Percent': config.PowerCurves[1].Points[9].Percent,
            'Model.Advanced.PowerCurves[1].Points[10].Time': Math.round(config.PowerCurves[1].Points[10].Time * 10),
            'Model.Advanced.PowerCurves[1].Points[10].Percent': config.PowerCurves[1].Points[10].Percent,
            'Model.Advanced.PowerCurves[1].Points[11].Time': Math.round(config.PowerCurves[1].Points[11].Time * 10),
            'Model.Advanced.PowerCurves[1].Points[11].Percent': config.PowerCurves[1].Points[11].Percent,

            'Model.Advanced.PowerCurves[2].Name': config.PowerCurves[2].Name,
            'Model.Advanced.PowerCurves[2].Points[0].Time': Math.round(config.PowerCurves[2].Points[0].Time * 10),
            'Model.Advanced.PowerCurves[2].Points[0].Percent': config.PowerCurves[2].Points[0].Percent,
            'Model.Advanced.PowerCurves[2].Points[1].Time': Math.round(config.PowerCurves[2].Points[1].Time * 10),
            'Model.Advanced.PowerCurves[2].Points[1].Percent': config.PowerCurves[2].Points[1].Percent,
            'Model.Advanced.PowerCurves[2].Points[2].Time': Math.round(config.PowerCurves[2].Points[2].Time * 10),
            'Model.Advanced.PowerCurves[2].Points[2].Percent': config.PowerCurves[2].Points[2].Percent,
            'Model.Advanced.PowerCurves[2].Points[3].Time': Math.round(config.PowerCurves[2].Points[3].Time * 10),
            'Model.Advanced.PowerCurves[2].Points[3].Percent': config.PowerCurves[2].Points[3].Percent,
            'Model.Advanced.PowerCurves[2].Points[4].Time': Math.round(config.PowerCurves[2].Points[4].Time * 10),
            'Model.Advanced.PowerCurves[2].Points[4].Percent': config.PowerCurves[2].Points[4].Percent,
            'Model.Advanced.PowerCurves[2].Points[5].Time': Math.round(config.PowerCurves[2].Points[5].Time * 10),
            'Model.Advanced.PowerCurves[2].Points[5].Percent': config.PowerCurves[2].Points[5].Percent,
            'Model.Advanced.PowerCurves[2].Points[6].Time': Math.round(config.PowerCurves[2].Points[6].Time * 10),
            'Model.Advanced.PowerCurves[2].Points[6].Percent': config.PowerCurves[2].Points[6].Percent,
            'Model.Advanced.PowerCurves[2].Points[7].Time': Math.round(config.PowerCurves[2].Points[7].Time * 10),
            'Model.Advanced.PowerCurves[2].Points[7].Percent': config.PowerCurves[2].Points[7].Percent,
            'Model.Advanced.PowerCurves[2].Points[8].Time': Math.round(config.PowerCurves[2].Points[8].Time * 10),
            'Model.Advanced.PowerCurves[2].Points[8].Percent': config.PowerCurves[2].Points[8].Percent,
            'Model.Advanced.PowerCurves[2].Points[9].Time': Math.round(config.PowerCurves[2].Points[9].Time * 10),
            'Model.Advanced.PowerCurves[2].Points[9].Percent': config.PowerCurves[2].Points[9].Percent,
            'Model.Advanced.PowerCurves[2].Points[10].Time': Math.round(config.PowerCurves[2].Points[10].Time * 10),
            'Model.Advanced.PowerCurves[2].Points[10].Percent': config.PowerCurves[2].Points[10].Percent,
            'Model.Advanced.PowerCurves[2].Points[11].Time': Math.round(config.PowerCurves[2].Points[11].Time * 10),
            'Model.Advanced.PowerCurves[2].Points[11].Percent': config.PowerCurves[2].Points[11].Percent,

            'Model.Advanced.PowerCurves[3].Name': config.PowerCurves[3].Name,
            'Model.Advanced.PowerCurves[3].Points[0].Time': Math.round(config.PowerCurves[3].Points[0].Time * 10),
            'Model.Advanced.PowerCurves[3].Points[0].Percent': config.PowerCurves[3].Points[0].Percent,
            'Model.Advanced.PowerCurves[3].Points[1].Time': Math.round(config.PowerCurves[3].Points[1].Time * 10),
            'Model.Advanced.PowerCurves[3].Points[1].Percent': config.PowerCurves[3].Points[1].Percent,
            'Model.Advanced.PowerCurves[3].Points[2].Time': Math.round(config.PowerCurves[3].Points[2].Time * 10),
            'Model.Advanced.PowerCurves[3].Points[2].Percent': config.PowerCurves[3].Points[2].Percent,
            'Model.Advanced.PowerCurves[3].Points[3].Time': Math.round(config.PowerCurves[3].Points[3].Time * 10),
            'Model.Advanced.PowerCurves[3].Points[3].Percent': config.PowerCurves[3].Points[3].Percent,
            'Model.Advanced.PowerCurves[3].Points[4].Time': Math.round(config.PowerCurves[3].Points[4].Time * 10),
            'Model.Advanced.PowerCurves[3].Points[4].Percent': config.PowerCurves[3].Points[4].Percent,
            'Model.Advanced.PowerCurves[3].Points[5].Time': Math.round(config.PowerCurves[3].Points[5].Time * 10),
            'Model.Advanced.PowerCurves[3].Points[5].Percent': config.PowerCurves[3].Points[5].Percent,
            'Model.Advanced.PowerCurves[3].Points[6].Time': Math.round(config.PowerCurves[3].Points[6].Time * 10),
            'Model.Advanced.PowerCurves[3].Points[6].Percent': config.PowerCurves[3].Points[6].Percent,
            'Model.Advanced.PowerCurves[3].Points[7].Time': Math.round(config.PowerCurves[3].Points[7].Time * 10),
            'Model.Advanced.PowerCurves[3].Points[7].Percent': config.PowerCurves[3].Points[7].Percent,
            'Model.Advanced.PowerCurves[3].Points[8].Time': Math.round(config.PowerCurves[3].Points[8].Time * 10),
            'Model.Advanced.PowerCurves[3].Points[8].Percent': config.PowerCurves[3].Points[8].Percent,
            'Model.Advanced.PowerCurves[3].Points[9].Time': Math.round(config.PowerCurves[3].Points[9].Time * 10),
            'Model.Advanced.PowerCurves[3].Points[9].Percent': config.PowerCurves[3].Points[9].Percent,
            'Model.Advanced.PowerCurves[3].Points[10].Time': Math.round(config.PowerCurves[3].Points[10].Time * 10),
            'Model.Advanced.PowerCurves[3].Points[10].Percent': config.PowerCurves[3].Points[10].Percent,
            'Model.Advanced.PowerCurves[3].Points[11].Time': Math.round(config.PowerCurves[3].Points[11].Time * 10),
            'Model.Advanced.PowerCurves[3].Points[11].Percent': config.PowerCurves[3].Points[11].Percent,

            'Model.Advanced.PowerCurves[4].Name': config.PowerCurves[4].Name,
            'Model.Advanced.PowerCurves[4].Points[0].Time': Math.round(config.PowerCurves[4].Points[0].Time * 10),
            'Model.Advanced.PowerCurves[4].Points[0].Percent': config.PowerCurves[4].Points[0].Percent,
            'Model.Advanced.PowerCurves[4].Points[1].Time': Math.round(config.PowerCurves[4].Points[1].Time * 10),
            'Model.Advanced.PowerCurves[4].Points[1].Percent': config.PowerCurves[4].Points[1].Percent,
            'Model.Advanced.PowerCurves[4].Points[2].Time': Math.round(config.PowerCurves[4].Points[2].Time * 10),
            'Model.Advanced.PowerCurves[4].Points[2].Percent': config.PowerCurves[4].Points[2].Percent,
            'Model.Advanced.PowerCurves[4].Points[3].Time': Math.round(config.PowerCurves[4].Points[3].Time * 10),
            'Model.Advanced.PowerCurves[4].Points[3].Percent': config.PowerCurves[4].Points[3].Percent,
            'Model.Advanced.PowerCurves[4].Points[4].Time': Math.round(config.PowerCurves[4].Points[4].Time * 10),
            'Model.Advanced.PowerCurves[4].Points[4].Percent': config.PowerCurves[4].Points[4].Percent,
            'Model.Advanced.PowerCurves[4].Points[5].Time': Math.round(config.PowerCurves[4].Points[5].Time * 10),
            'Model.Advanced.PowerCurves[4].Points[5].Percent': config.PowerCurves[4].Points[5].Percent,
            'Model.Advanced.PowerCurves[4].Points[6].Time': Math.round(config.PowerCurves[4].Points[6].Time * 10),
            'Model.Advanced.PowerCurves[4].Points[6].Percent': config.PowerCurves[4].Points[6].Percent,
            'Model.Advanced.PowerCurves[4].Points[7].Time': Math.round(config.PowerCurves[4].Points[7].Time * 10),
            'Model.Advanced.PowerCurves[4].Points[7].Percent': config.PowerCurves[4].Points[7].Percent,
            'Model.Advanced.PowerCurves[4].Points[8].Time': Math.round(config.PowerCurves[4].Points[8].Time * 10),
            'Model.Advanced.PowerCurves[4].Points[8].Percent': config.PowerCurves[4].Points[8].Percent,
            'Model.Advanced.PowerCurves[4].Points[9].Time': Math.round(config.PowerCurves[4].Points[9].Time * 10),
            'Model.Advanced.PowerCurves[4].Points[9].Percent': config.PowerCurves[4].Points[9].Percent,
            'Model.Advanced.PowerCurves[4].Points[10].Time': Math.round(config.PowerCurves[4].Points[10].Time * 10),
            'Model.Advanced.PowerCurves[4].Points[10].Percent': config.PowerCurves[4].Points[10].Percent,
            'Model.Advanced.PowerCurves[4].Points[11].Time': Math.round(config.PowerCurves[4].Points[11].Time * 10),
            'Model.Advanced.PowerCurves[4].Points[11].Percent': config.PowerCurves[4].Points[11].Percent,

            'Model.Advanced.PowerCurves[5].Name': config.PowerCurves[5].Name,
            'Model.Advanced.PowerCurves[5].Points[0].Time': Math.round(config.PowerCurves[5].Points[0].Time * 10),
            'Model.Advanced.PowerCurves[5].Points[0].Percent': config.PowerCurves[5].Points[0].Percent,
            'Model.Advanced.PowerCurves[5].Points[1].Time': Math.round(config.PowerCurves[5].Points[1].Time * 10),
            'Model.Advanced.PowerCurves[5].Points[1].Percent': config.PowerCurves[5].Points[1].Percent,
            'Model.Advanced.PowerCurves[5].Points[2].Time': Math.round(config.PowerCurves[5].Points[2].Time * 10),
            'Model.Advanced.PowerCurves[5].Points[2].Percent': config.PowerCurves[5].Points[2].Percent,
            'Model.Advanced.PowerCurves[5].Points[3].Time': Math.round(config.PowerCurves[5].Points[3].Time * 10),
            'Model.Advanced.PowerCurves[5].Points[3].Percent': config.PowerCurves[5].Points[3].Percent,
            'Model.Advanced.PowerCurves[5].Points[4].Time': Math.round(config.PowerCurves[5].Points[4].Time * 10),
            'Model.Advanced.PowerCurves[5].Points[4].Percent': config.PowerCurves[5].Points[4].Percent,
            'Model.Advanced.PowerCurves[5].Points[5].Time': Math.round(config.PowerCurves[5].Points[5].Time * 10),
            'Model.Advanced.PowerCurves[5].Points[5].Percent': config.PowerCurves[5].Points[5].Percent,
            'Model.Advanced.PowerCurves[5].Points[6].Time': Math.round(config.PowerCurves[5].Points[6].Time * 10),
            'Model.Advanced.PowerCurves[5].Points[6].Percent': config.PowerCurves[5].Points[6].Percent,
            'Model.Advanced.PowerCurves[5].Points[7].Time': Math.round(config.PowerCurves[5].Points[7].Time * 10),
            'Model.Advanced.PowerCurves[5].Points[7].Percent': config.PowerCurves[5].Points[7].Percent,
            'Model.Advanced.PowerCurves[5].Points[8].Time': Math.round(config.PowerCurves[5].Points[8].Time * 10),
            'Model.Advanced.PowerCurves[5].Points[8].Percent': config.PowerCurves[5].Points[8].Percent,
            'Model.Advanced.PowerCurves[5].Points[9].Time': Math.round(config.PowerCurves[5].Points[9].Time * 10),
            'Model.Advanced.PowerCurves[5].Points[9].Percent': config.PowerCurves[5].Points[9].Percent,
            'Model.Advanced.PowerCurves[5].Points[10].Time': Math.round(config.PowerCurves[5].Points[10].Time * 10),
            'Model.Advanced.PowerCurves[5].Points[10].Percent': config.PowerCurves[5].Points[10].Percent,
            'Model.Advanced.PowerCurves[5].Points[11].Time': Math.round(config.PowerCurves[5].Points[11].Time * 10),
            'Model.Advanced.PowerCurves[5].Points[11].Percent': config.PowerCurves[5].Points[11].Percent,

            'Model.Advanced.PowerCurves[6].Name': config.PowerCurves[6].Name,
            'Model.Advanced.PowerCurves[6].Points[0].Time': Math.round(config.PowerCurves[6].Points[0].Time * 10),
            'Model.Advanced.PowerCurves[6].Points[0].Percent': config.PowerCurves[6].Points[0].Percent,
            'Model.Advanced.PowerCurves[6].Points[1].Time': Math.round(config.PowerCurves[6].Points[1].Time * 10),
            'Model.Advanced.PowerCurves[6].Points[1].Percent': config.PowerCurves[6].Points[1].Percent,
            'Model.Advanced.PowerCurves[6].Points[2].Time': Math.round(config.PowerCurves[6].Points[2].Time * 10),
            'Model.Advanced.PowerCurves[6].Points[2].Percent': config.PowerCurves[6].Points[2].Percent,
            'Model.Advanced.PowerCurves[6].Points[3].Time': Math.round(config.PowerCurves[6].Points[3].Time * 10),
            'Model.Advanced.PowerCurves[6].Points[3].Percent': config.PowerCurves[6].Points[3].Percent,
            'Model.Advanced.PowerCurves[6].Points[4].Time': Math.round(config.PowerCurves[6].Points[4].Time * 10),
            'Model.Advanced.PowerCurves[6].Points[4].Percent': config.PowerCurves[6].Points[4].Percent,
            'Model.Advanced.PowerCurves[6].Points[5].Time': Math.round(config.PowerCurves[6].Points[5].Time * 10),
            'Model.Advanced.PowerCurves[6].Points[5].Percent': config.PowerCurves[6].Points[5].Percent,
            'Model.Advanced.PowerCurves[6].Points[6].Time': Math.round(config.PowerCurves[6].Points[6].Time * 10),
            'Model.Advanced.PowerCurves[6].Points[6].Percent': config.PowerCurves[6].Points[6].Percent,
            'Model.Advanced.PowerCurves[6].Points[7].Time': Math.round(config.PowerCurves[6].Points[7].Time * 10),
            'Model.Advanced.PowerCurves[6].Points[7].Percent': config.PowerCurves[6].Points[7].Percent,
            'Model.Advanced.PowerCurves[6].Points[8].Time': Math.round(config.PowerCurves[6].Points[8].Time * 10),
            'Model.Advanced.PowerCurves[6].Points[8].Percent': config.PowerCurves[6].Points[8].Percent,
            'Model.Advanced.PowerCurves[6].Points[9].Time': Math.round(config.PowerCurves[6].Points[9].Time * 10),
            'Model.Advanced.PowerCurves[6].Points[9].Percent': config.PowerCurves[6].Points[9].Percent,
            'Model.Advanced.PowerCurves[6].Points[10].Time': Math.round(config.PowerCurves[6].Points[10].Time * 10),
            'Model.Advanced.PowerCurves[6].Points[10].Percent': config.PowerCurves[6].Points[10].Percent,
            'Model.Advanced.PowerCurves[6].Points[11].Time': Math.round(config.PowerCurves[6].Points[11].Time * 10),
            'Model.Advanced.PowerCurves[6].Points[11].Percent': config.PowerCurves[6].Points[11].Percent,

            'Model.Advanced.PowerCurves[7].Name': config.PowerCurves[7].Name,
            'Model.Advanced.PowerCurves[7].Points[0].Time': Math.round(config.PowerCurves[7].Points[0].Time * 10),
            'Model.Advanced.PowerCurves[7].Points[0].Percent': config.PowerCurves[7].Points[0].Percent,
            'Model.Advanced.PowerCurves[7].Points[1].Time': Math.round(config.PowerCurves[7].Points[1].Time * 10),
            'Model.Advanced.PowerCurves[7].Points[1].Percent': config.PowerCurves[7].Points[1].Percent,
            'Model.Advanced.PowerCurves[7].Points[2].Time': Math.round(config.PowerCurves[7].Points[2].Time * 10),
            'Model.Advanced.PowerCurves[7].Points[2].Percent': config.PowerCurves[7].Points[2].Percent,
            'Model.Advanced.PowerCurves[7].Points[3].Time': Math.round(config.PowerCurves[7].Points[3].Time * 10),
            'Model.Advanced.PowerCurves[7].Points[3].Percent': config.PowerCurves[7].Points[3].Percent,
            'Model.Advanced.PowerCurves[7].Points[4].Time': Math.round(config.PowerCurves[7].Points[4].Time * 10),
            'Model.Advanced.PowerCurves[7].Points[4].Percent': config.PowerCurves[7].Points[4].Percent,
            'Model.Advanced.PowerCurves[7].Points[5].Time': Math.round(config.PowerCurves[7].Points[5].Time * 10),
            'Model.Advanced.PowerCurves[7].Points[5].Percent': config.PowerCurves[7].Points[5].Percent,
            'Model.Advanced.PowerCurves[7].Points[6].Time': Math.round(config.PowerCurves[7].Points[6].Time * 10),
            'Model.Advanced.PowerCurves[7].Points[6].Percent': config.PowerCurves[7].Points[6].Percent,
            'Model.Advanced.PowerCurves[7].Points[7].Time': Math.round(config.PowerCurves[7].Points[7].Time * 10),
            'Model.Advanced.PowerCurves[7].Points[7].Percent': config.PowerCurves[7].Points[7].Percent,
            'Model.Advanced.PowerCurves[7].Points[8].Time': Math.round(config.PowerCurves[7].Points[8].Time * 10),
            'Model.Advanced.PowerCurves[7].Points[8].Percent': config.PowerCurves[7].Points[8].Percent,
            'Model.Advanced.PowerCurves[7].Points[9].Time': Math.round(config.PowerCurves[7].Points[9].Time * 10),
            'Model.Advanced.PowerCurves[7].Points[9].Percent': config.PowerCurves[7].Points[9].Percent,
            'Model.Advanced.PowerCurves[7].Points[10].Time': Math.round(config.PowerCurves[7].Points[10].Time * 10),
            'Model.Advanced.PowerCurves[7].Points[10].Percent': config.PowerCurves[7].Points[10].Percent,
            'Model.Advanced.PowerCurves[7].Points[11].Time': Math.round(config.PowerCurves[7].Points[11].Time * 10),
            'Model.Advanced.PowerCurves[7].Points[11].Percent': config.PowerCurves[7].Points[11].Percent,

            'Model.Advanced.DeepSleepMode': enumDeepSleepMode[config.DeepSleepMode],
            'Model.Advanced.DeepSleepDelay': config.DeepSleepDelay,

        };
        const obj = {
            SerializableConfiguration: {
                Data: {
                    Item: []
                }
            }
        };
        Object.keys(map).forEach(Key => {
            let Value;
            if (typeof map[Key] === 'function') {
                Value = map[Key](config);
            } else {
                if (Key.endsWith('.Name')) {
                    Value = map[Key].replace(/\u0000/g, '');
                } else {
                    Value = map[Key];
                }

            }

            if (typeof Value === 'undefined') {
                console.log('!!!', Key);
            }

            obj.SerializableConfiguration.Data.Item.push({
                $: {Key, Value}
            });
        });
        const builder = new xml2js.Builder({
            headless: true
        });
        let xml = builder.buildObject(obj);
        xml = xml.replace(/\/>/g, ' />');
        xml = xml.replace(/"false"/g, '"False"');
        xml = xml.replace(/"true"/g, '"True"');
        xml = xml.replace(/\n/g, '\r\n');
        return '\ufeff' + xml;
    }

    xml2conf(xml, cb) {

        function bool(val) {
            return val !== 'False';
        }

        function re(en, val) {
            let res = val;
            Object.keys(en).forEach(i => {
                if (en[i] === val) {
                    res = i;
                }
            });
            return Number(res);
        }

        function reStartsWith(en, val) {
            let res = val;
            Object.keys(en).forEach(i => {
                const [first, last] = val.split(', ');
                if (first === en[i]) {
                    res = i;
                }
            });
            return Number(res);
        }

        const map = {
            'Model.Info.SettingsVersion': (config, val) => config.SettingsVersion = Number(val),
            'Model.Info.ProductId': (config, val) => config.ProductId = val,
            'Model.Info.HardwareVersion': (config, val) => config.HardwareVersion = val,
            'Model.Info.MaxDevicePower': (config, val) => config.MaxDevicePower = Number(val),
            'Model.Info.NumberOfBatteries': (config, val) => config.NumberOfBatteries = Number(val),
            'Model.Info.MaxChargingCurrent': (config, val) => config.MaxChargingCurrent = Number(val),
            'Model.Info.DisplaySize': (config, val) => config.DisplaySize = re(enumDisplaySize, val),

            'Model.Info.FirmwareVersion': (config, val) => config.FirmwareVersion = val,
            'Model.Info.FirmwareBuild': (config, val) => config.FirmwareBuild = Number(val),

            'Model.General.Profiles[0].Name': (config, val) => config.profiles[0].Name = (val + '\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000').substr(0, 8),
            'Model.General.Profiles[0].Flags.Material': (config, val) => config.profiles[0].Material = re(enumMaterial, val),
            'Model.General.Profiles[0].Flags.IsTemperatureDominant': (config, val) => config.profiles[0].IsTemperatureDominant = bool(val),
            'Model.General.Profiles[0].Flags.IsResistanceLocked': (config, val) => config.profiles[0].IsResistanceLocked = bool(val),
            'Model.General.Profiles[0].Flags.IsEnabled': (config, val) => config.profiles[0].IsEnabled = bool(val),
            'Model.General.Profiles[0].Flags2.IsPIEnabled': (config, val) => config.profiles[0].IsPIEnabled = bool(val),
            'Model.General.Profiles[0].Flags2.IsPowerStep1W': (config, val) => config.profiles[0].IsPowerStep1W = bool(val),
            'Model.General.Profiles[0].Flags2.IsTemperatureStep1C2F': (config, val) => config.profiles[0].IsTemperatureStep1C2F = bool(val),
            'Model.General.Profiles[0].Power': (config, val) => config.profiles[0].Power = val / 10,
            'Model.General.Profiles[0].PreheatType': (config, val) => config.profiles[0].PreheatType = re(enumPreheatType, val),
            'Model.General.Profiles[0].SelectedCurve': (config, val) => config.profiles[0].SelectedCurve = Number(val),
            'Model.General.Profiles[0].PreheatTime': (config, val) => config.profiles[0].PreheatTime = Number(val),
            'Model.General.Profiles[0].PreheatDelay': (config, val) => config.profiles[0].PreheatDelay = Number(val),
            'Model.General.Profiles[0].PreheatPower': (config, val) => config.profiles[0].PreheatPower = Number(val),
            'Model.General.Profiles[0].Temperature': (config, val) => config.profiles[0].Temperature = Number(val),
            'Model.General.Profiles[0].Resistance': (config, val) => config.profiles[0].Resistance = Number(val),
            'Model.General.Profiles[0].TCR': (config, val) => config.profiles[0].TCR = Number(val),
            'Model.General.Profiles[0].PIRegulator.Range': (config, val) => config.profiles[0].PIRegulatorRange = Number(val),
            'Model.General.Profiles[0].PIRegulator.PValue': (config, val) => config.profiles[0].PIRegulatorPValue = Number(val),
            'Model.General.Profiles[0].PIRegulator.IValue': (config, val) => config.profiles[0].PIRegulatorIValue = Number(val),

            'Model.General.Profiles[1].Name': (config, val) => config.profiles[1].Name = (val + '\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000').substr(0, 8),
            'Model.General.Profiles[1].Flags.Material': (config, val) => config.profiles[1].Material = re(enumMaterial, val),
            'Model.General.Profiles[1].Flags.IsTemperatureDominant': (config, val) => config.profiles[1].IsTemperatureDominant = bool(val),
            'Model.General.Profiles[1].Flags.IsResistanceLocked': (config, val) => config.profiles[1].IsResistanceLocked = bool(val),
            'Model.General.Profiles[1].Flags.IsEnabled': (config, val) => config.profiles[1].IsEnabled = bool(val),
            'Model.General.Profiles[1].Flags2.IsPIEnabled': (config, val) => config.profiles[1].IsPIEnabled = bool(val),
            'Model.General.Profiles[1].Flags2.IsPowerStep1W': (config, val) => config.profiles[1].IsPowerStep1W = bool(val),
            'Model.General.Profiles[1].Flags2.IsTemperatureStep1C2F': (config, val) => config.profiles[1].IsTemperatureStep1C2F = bool(val),
            'Model.General.Profiles[1].Power': (config, val) => config.profiles[1].Power = val / 10,
            'Model.General.Profiles[1].PreheatType': (config, val) => config.profiles[1].PreheatType = re(enumPreheatType, val),
            'Model.General.Profiles[1].SelectedCurve': (config, val) => config.profiles[1].SelectedCurve = Number(val),
            'Model.General.Profiles[1].PreheatTime': (config, val) => config.profiles[1].PreheatTime = Number(val),
            'Model.General.Profiles[1].PreheatDelay': (config, val) => config.profiles[1].PreheatDelay = Number(val),
            'Model.General.Profiles[1].PreheatPower': (config, val) => config.profiles[1].PreheatPower = Number(val),
            'Model.General.Profiles[1].Temperature': (config, val) => config.profiles[1].Temperature = Number(val),
            'Model.General.Profiles[1].Resistance': (config, val) => config.profiles[1].Resistance = Number(val),
            'Model.General.Profiles[1].TCR': (config, val) => config.profiles[1].TCR = Number(val),
            'Model.General.Profiles[1].PIRegulator.Range': (config, val) => config.profiles[1].PIRegulatorRange = Number(val),
            'Model.General.Profiles[1].PIRegulator.PValue': (config, val) => config.profiles[1].PIRegulatorPValue = Number(val),
            'Model.General.Profiles[1].PIRegulator.IValue': (config, val) => config.profiles[1].PIRegulatorIValue = Number(val),

            'Model.General.Profiles[2].Name': (config, val) => config.profiles[2].Name = (val + '\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000').substr(0, 8),
            'Model.General.Profiles[2].Flags.Material': (config, val) => config.profiles[2].Material = re(enumMaterial, val),
            'Model.General.Profiles[2].Flags.IsTemperatureDominant': (config, val) => config.profiles[2].IsTemperatureDominant = bool(val),
            'Model.General.Profiles[2].Flags.IsCelcius': (config, val) => config.profiles[2].IsCelcius = bool(val),
            'Model.General.Profiles[2].Flags.IsResistanceLocked': (config, val) => config.profiles[2].IsResistanceLocked = bool(val),
            'Model.General.Profiles[2].Flags.IsEnabled': (config, val) => config.profiles[2].IsEnabled = bool(val),
            'Model.General.Profiles[2].Flags2.IsPIEnabled': (config, val) => config.profiles[2].IsPIEnabled = bool(val),
            'Model.General.Profiles[2].Flags2.IsPowerStep1W': (config, val) => config.profiles[2].IsPowerStep1W = bool(val),
            'Model.General.Profiles[2].Flags2.IsTemperatureStep1C2F': (config, val) => config.profiles[2].IsTemperatureStep1C2F = bool(val),
            'Model.General.Profiles[2].Power': (config, val) => config.profiles[2].Power = val / 10,
            'Model.General.Profiles[2].PreheatType': (config, val) => config.profiles[2].PreheatType = re(enumPreheatType, val),
            'Model.General.Profiles[2].SelectedCurve': (config, val) => config.profiles[2].SelectedCurve = Number(val),
            'Model.General.Profiles[2].PreheatTime': (config, val) => config.profiles[2].PreheatTime = Number(val),
            'Model.General.Profiles[2].PreheatDelay': (config, val) => config.profiles[2].PreheatDelay = Number(val),
            'Model.General.Profiles[2].PreheatPower': (config, val) => config.profiles[2].PreheatPower = Number(val),
            'Model.General.Profiles[2].Temperature': (config, val) => config.profiles[2].Temperature = Number(val),
            'Model.General.Profiles[2].Resistance': (config, val) => config.profiles[2].Resistance = Number(val),
            'Model.General.Profiles[2].TCR': (config, val) => config.profiles[2].TCR = Number(val),
            'Model.General.Profiles[2].PIRegulator.Range': (config, val) => config.profiles[2].PIRegulatorRange = Number(val),
            'Model.General.Profiles[2].PIRegulator.PValue': (config, val) => config.profiles[2].PIRegulatorPValue = Number(val),
            'Model.General.Profiles[2].PIRegulator.IValue': (config, val) => config.profiles[2].PIRegulatorIValue = Number(val),

            'Model.General.Profiles[3].Name': (config, val) => config.profiles[3].Name = (val + '\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000').substr(0, 8),
            'Model.General.Profiles[3].Flags.Material': (config, val) => config.profiles[3].Material = re(enumMaterial, val),
            'Model.General.Profiles[3].Flags.IsTemperatureDominant': (config, val) => config.profiles[3].IsTemperatureDominant = bool(val),
            'Model.General.Profiles[3].Flags.IsResistanceLocked': (config, val) => config.profiles[3].IsResistanceLocked = bool(val),
            'Model.General.Profiles[3].Flags.IsEnabled': (config, val) => config.profiles[3].IsEnabled = bool(val),
            'Model.General.Profiles[3].Flags2.IsPIEnabled': (config, val) => config.profiles[3].IsPIEnabled = bool(val),
            'Model.General.Profiles[3].Flags2.IsPowerStep1W': (config, val) => config.profiles[3].IsPowerStep1W = bool(val),
            'Model.General.Profiles[3].Flags2.IsTemperatureStep1C2F': (config, val) => config.profiles[3].IsTemperatureStep1C2F = bool(val),
            'Model.General.Profiles[3].Power': (config, val) => config.profiles[3].Power = val / 10,
            'Model.General.Profiles[3].PreheatType': (config, val) => config.profiles[3].PreheatType = re(enumPreheatType, val),
            'Model.General.Profiles[3].SelectedCurve': (config, val) => config.profiles[3].SelectedCurve = Number(val),
            'Model.General.Profiles[3].PreheatTime': (config, val) => config.profiles[3].PreheatTime = Number(val),
            'Model.General.Profiles[3].PreheatDelay': (config, val) => config.profiles[3].PreheatDelay = Number(val),
            'Model.General.Profiles[3].PreheatPower': (config, val) => config.profiles[3].PreheatPower = Number(val),
            'Model.General.Profiles[3].Temperature': (config, val) => config.profiles[3].Temperature = Number(val),
            'Model.General.Profiles[3].Resistance': (config, val) => config.profiles[3].Resistance = Number(val),
            'Model.General.Profiles[3].TCR': (config, val) => config.profiles[3].TCR = Number(val),
            'Model.General.Profiles[3].PIRegulator.Range': (config, val) => config.profiles[3].PIRegulatorRange = Number(val),
            'Model.General.Profiles[3].PIRegulator.PValue': (config, val) => config.profiles[3].PIRegulatorPValue = Number(val),
            'Model.General.Profiles[3].PIRegulator.IValue': (config, val) => config.profiles[3].PIRegulatorIValue = Number(val),

            'Model.General.Profiles[4].Name': (config, val) => config.profiles[4].Name = (val + '\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000').substr(0, 8),
            'Model.General.Profiles[4].Flags.Material': (config, val) => config.profiles[4].Material = re(enumMaterial, val),
            'Model.General.Profiles[4].Flags.IsTemperatureDominant': (config, val) => config.profiles[4].IsTemperatureDominant = bool(val),
            'Model.General.Profiles[4].Flags.IsCelcius': (config, val) => config.profiles[4].IsCelcius = bool(val),
            'Model.General.Profiles[4].Flags.IsResistanceLocked': (config, val) => config.profiles[4].IsResistanceLocked = bool(val),
            'Model.General.Profiles[4].Flags.IsEnabled': (config, val) => config.profiles[4].IsEnabled = bool(val),
            'Model.General.Profiles[4].Flags2.IsPIEnabled': (config, val) => config.profiles[4].IsPIEnabled = bool(val),
            'Model.General.Profiles[4].Flags2.IsPowerStep1W': (config, val) => config.profiles[4].IsPowerStep1W = bool(val),
            'Model.General.Profiles[4].Flags2.IsTemperatureStep1C2F': (config, val) => config.profiles[4].IsTemperatureStep1C2F = bool(val),
            'Model.General.Profiles[4].Power': (config, val) => config.profiles[4].Power = val / 10,
            'Model.General.Profiles[4].PreheatType': (config, val) => config.profiles[4].PreheatType = re(enumPreheatType, val),
            'Model.General.Profiles[4].SelectedCurve': (config, val) => config.profiles[4].SelectedCurve = Number(val),
            'Model.General.Profiles[4].PreheatTime': (config, val) => config.profiles[4].PreheatTime = Number(val),
            'Model.General.Profiles[4].PreheatDelay': (config, val) => config.profiles[4].PreheatDelay = Number(val),
            'Model.General.Profiles[4].PreheatPower': (config, val) => config.profiles[4].PreheatPower = Number(val),
            'Model.General.Profiles[4].Temperature': (config, val) => config.profiles[4].Temperature = Number(val),
            'Model.General.Profiles[4].Resistance': (config, val) => config.profiles[4].Resistance = Number(val),
            'Model.General.Profiles[4].TCR': (config, val) => config.profiles[4].TCR = Number(val),
            'Model.General.Profiles[4].PIRegulator.Range': (config, val) => config.profiles[4].PIRegulatorRange = Number(val),
            'Model.General.Profiles[4].PIRegulator.PValue': (config, val) => config.profiles[4].PIRegulatorPValue = Number(val),
            'Model.General.Profiles[4].PIRegulator.IValue': (config, val) => config.profiles[4].PIRegulatorIValue = Number(val),

            'Model.General.Profiles[5].Name': (config, val) => config.profiles[5].Name = (val + '\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000').substr(0, 8),
            'Model.General.Profiles[5].Flags.Material': (config, val) => config.profiles[5].Material = re(enumMaterial, val),
            'Model.General.Profiles[5].Flags.IsTemperatureDominant': (config, val) => config.profiles[5].IsTemperatureDominant = bool(val),
            'Model.General.Profiles[5].Flags.IsCelcius': (config, val) => config.profiles[5].IsCelcius = bool(val),
            'Model.General.Profiles[5].Flags.IsResistanceLocked': (config, val) => config.profiles[5].IsResistanceLocked = bool(val),
            'Model.General.Profiles[5].Flags.IsEnabled': (config, val) => config.profiles[5].IsEnabled = bool(val),
            'Model.General.Profiles[5].Flags2.IsPIEnabled': (config, val) => config.profiles[5].IsPIEnabled = bool(val),
            'Model.General.Profiles[5].Flags2.IsPowerStep1W': (config, val) => config.profiles[5].IsPowerStep1W = bool(val),
            'Model.General.Profiles[5].Flags2.IsTemperatureStep1C2F': (config, val) => config.profiles[5].IsTemperatureStep1C2F = bool(val),
            'Model.General.Profiles[5].Power': (config, val) => config.profiles[5].Power = val / 10,
            'Model.General.Profiles[5].PreheatType': (config, val) => config.profiles[5].PreheatType = re(enumPreheatType, val),
            'Model.General.Profiles[5].SelectedCurve': (config, val) => config.profiles[5].SelectedCurve = Number(val),
            'Model.General.Profiles[5].PreheatTime': (config, val) => config.profiles[5].PreheatTime = Number(val),
            'Model.General.Profiles[5].PreheatDelay': (config, val) => config.profiles[5].PreheatDelay = Number(val),
            'Model.General.Profiles[5].PreheatPower': (config, val) => config.profiles[5].PreheatPower = Number(val),
            'Model.General.Profiles[5].Temperature': (config, val) => config.profiles[5].Temperature = Number(val),
            'Model.General.Profiles[5].Resistance': (config, val) => config.profiles[5].Resistance = Number(val),
            'Model.General.Profiles[5].TCR': (config, val) => config.profiles[5].TCR = Number(val),
            'Model.General.Profiles[5].PIRegulator.Range': (config, val) => config.profiles[5].PIRegulatorRange = Number(val),
            'Model.General.Profiles[5].PIRegulator.PValue': (config, val) => config.profiles[5].PIRegulatorPValue = Number(val),
            'Model.General.Profiles[5].PIRegulator.IValue': (config, val) => config.profiles[5].PIRegulatorIValue = Number(val),

            'Model.General.Profiles[6].Name': (config, val) => config.profiles[6].Name = (val + '\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000').substr(0, 8),
            'Model.General.Profiles[6].Flags.Material': (config, val) => config.profiles[6].Material = re(enumMaterial, val),
            'Model.General.Profiles[6].Flags.IsTemperatureDominant': (config, val) => config.profiles[6].IsTemperatureDominant = bool(val),
            'Model.General.Profiles[6].Flags.IsResistanceLocked': (config, val) => config.profiles[6].IsResistanceLocked = bool(val),
            'Model.General.Profiles[6].Flags.IsEnabled': (config, val) => config.profiles[6].IsEnabled = bool(val),
            'Model.General.Profiles[6].Flags2.IsPIEnabled': (config, val) => config.profiles[6].IsPIEnabled = bool(val),
            'Model.General.Profiles[6].Flags2.IsPowerStep1W': (config, val) => config.profiles[6].IsPowerStep1W = bool(val),
            'Model.General.Profiles[6].Flags2.IsTemperatureStep1C2F': (config, val) => config.profiles[6].IsTemperatureStep1C2F = bool(val),
            'Model.General.Profiles[6].Power': (config, val) => config.profiles[6].Power = val / 10,
            'Model.General.Profiles[6].PreheatType': (config, val) => config.profiles[6].PreheatType = re(enumPreheatType, val),
            'Model.General.Profiles[6].SelectedCurve': (config, val) => config.profiles[6].SelectedCurve = Number(val),
            'Model.General.Profiles[6].PreheatTime': (config, val) => config.profiles[6].PreheatTime = Number(val),
            'Model.General.Profiles[6].PreheatDelay': (config, val) => config.profiles[6].PreheatDelay = Number(val),
            'Model.General.Profiles[6].PreheatPower': (config, val) => config.profiles[6].PreheatPower = Number(val),
            'Model.General.Profiles[6].Temperature': (config, val) => config.profiles[6].Temperature = Number(val),
            'Model.General.Profiles[6].Resistance': (config, val) => config.profiles[6].Resistance = Number(val),
            'Model.General.Profiles[6].TCR': (config, val) => config.profiles[6].TCR = Number(val),
            'Model.General.Profiles[6].PIRegulator.Range': (config, val) => config.profiles[6].PIRegulatorRange = Number(val),
            'Model.General.Profiles[6].PIRegulator.PValue': (config, val) => config.profiles[6].PIRegulatorPValue = Number(val),
            'Model.General.Profiles[6].PIRegulator.IValue': (config, val) => config.profiles[6].PIRegulatorIValue = Number(val),

            'Model.General.Profiles[7].Name': (config, val) => config.profiles[7].Name = (val + '\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000').substr(0, 8),
            'Model.General.Profiles[7].Flags.Material': (config, val) => config.profiles[7].Material = re(enumMaterial, val),
            'Model.General.Profiles[7].Flags.IsTemperatureDominant': (config, val) => config.profiles[7].IsTemperatureDominant = bool(val),
            'Model.General.Profiles[7].Flags.IsResistanceLocked': (config, val) => config.profiles[7].IsResistanceLocked = bool(val),
            'Model.General.Profiles[7].Flags.IsEnabled': (config, val) => config.profiles[7].IsEnabled = bool(val),
            'Model.General.Profiles[7].Flags2.IsPIEnabled': (config, val) => config.profiles[7].IsPIEnabled = bool(val),
            'Model.General.Profiles[7].Flags2.IsPowerStep1W': (config, val) => config.profiles[7].IsPowerStep1W = bool(val),
            'Model.General.Profiles[7].Flags2.IsTemperatureStep1C2F': (config, val) => config.profiles[7].IsTemperatureStep1C2F = bool(val),
            'Model.General.Profiles[7].Power': (config, val) => config.profiles[7].Power = val / 10,
            'Model.General.Profiles[7].PreheatType': (config, val) => config.profiles[7].PreheatType = re(enumPreheatType, val),
            'Model.General.Profiles[7].SelectedCurve': (config, val) => config.profiles[7].SelectedCurve = Number(val),
            'Model.General.Profiles[7].PreheatTime': (config, val) => config.profiles[7].PreheatTime = Number(val),
            'Model.General.Profiles[7].PreheatDelay': (config, val) => config.profiles[7].PreheatDelay = Number(val),
            'Model.General.Profiles[7].PreheatPower': (config, val) => config.profiles[7].PreheatPower = Number(val),
            'Model.General.Profiles[7].Temperature': (config, val) => config.profiles[7].Temperature = Number(val),
            'Model.General.Profiles[7].Resistance': (config, val) => config.profiles[7].Resistance = Number(val),
            'Model.General.Profiles[7].TCR': (config, val) => config.profiles[7].TCR = Number(val),
            'Model.General.Profiles[7].PIRegulator.Range': (config, val) => config.profiles[7].PIRegulatorRange = Number(val),
            'Model.General.Profiles[7].PIRegulator.PValue': (config, val) => config.profiles[7].PIRegulatorPValue = Number(val),
            'Model.General.Profiles[7].PIRegulator.IValue': (config, val) => config.profiles[7].PIRegulatorIValue = Number(val),

            'Model.General.SelectedProfile': (config, val) => config.SelectedProfile = Number(val),
            'Model.General.SmartMode': (config, val) => config.SmartMode = re(enumSmartMode, val),
            'Model.General.SmartRange': (config, val) => config.SmartRange = Number(val),

            'Model.Interface.ClicksVW[0]': (config, val) => config.ClicksVW0 = re(enumClickAction, val),
            'Model.Interface.ClicksVW[1]': (config, val) => config.ClicksVW1 = re(enumClickAction, val),
            'Model.Interface.ClicksVW[2]': (config, val) => config.ClicksVW2 = re(enumClickAction, val),

            'Model.Interface.ClicksTC[0]': (config, val) => config.ClicksTC0 = re(enumClickAction, val),
            'Model.Interface.ClicksTC[1]': (config, val) => config.ClicksTC1 = re(enumClickAction, val),
            'Model.Interface.ClicksTC[2]': (config, val) => config.ClicksTC2 = re(enumClickAction, val),

            'Model.Interface.ShortcutsVW[0].InStandby': (config, val) => config.ShortcutsVW0InStandby = re(enumClickAction, val),
            'Model.Interface.ShortcutsVW[0].InEditMain': (config, val) => config.ShortcutsVW0InEditMain = re(enumShortcutsInEdit, val),
            'Model.Interface.ShortcutsVW[0].InSelector': (config, val) => config.ShortcutsVW0InSelector = re(enumShortcutsInSelector, val),
            'Model.Interface.ShortcutsVW[0].InMenu': (config, val) => config.ShortcutsVW0InMenu = re(enumShortcutsInMenu, val),

            'Model.Interface.ShortcutsVW[1].InStandby': (config, val) => config.ShortcutsVW1InStandby = re(enumClickAction, val),
            'Model.Interface.ShortcutsVW[1].InEditMain': (config, val) => config.ShortcutsVW1InEditMain = re(enumShortcutsInEdit, val),
            'Model.Interface.ShortcutsVW[1].InSelector': (config, val) => config.ShortcutsVW1InSelector = re(enumShortcutsInSelector, val),
            'Model.Interface.ShortcutsVW[1].InMenu': (config, val) => config.ShortcutsVW1InMenu = re(enumShortcutsInMenu, val),

            'Model.Interface.ShortcutsVW[2].InStandby': (config, val) => config.ShortcutsVW2InStandby = re(enumClickAction, val),
            'Model.Interface.ShortcutsVW[2].InEditMain': (config, val) => config.ShortcutsVW2InEditMain = re(enumShortcutsInEdit, val),
            'Model.Interface.ShortcutsVW[2].InSelector': (config, val) => config.ShortcutsVW2InSelector = re(enumShortcutsInSelector, val),
            'Model.Interface.ShortcutsVW[2].InMenu': (config, val) => config.ShortcutsVW2InMenu = re(enumShortcutsInMenu, val),

            'Model.Interface.ShortcutsTC[0].InStandby': (config, val) => config.ShortcutsTC0InStandby = re(enumClickAction, val),
            'Model.Interface.ShortcutsTC[0].InEditMain': (config, val) => config.ShortcutsTC0InEditMain = re(enumShortcutsInEdit, val),
            'Model.Interface.ShortcutsTC[0].InSelector': (config, val) => config.ShortcutsTC0InSelector = re(enumShortcutsInSelector, val),
            'Model.Interface.ShortcutsTC[0].InMenu': (config, val) => config.ShortcutsTC0InMenu = re(enumShortcutsInMenu, val),

            'Model.Interface.ShortcutsTC[1].InStandby': (config, val) => config.ShortcutsTC1InStandby = re(enumClickAction, val),
            'Model.Interface.ShortcutsTC[1].InEditMain': (config, val) => config.ShortcutsTC1InEditMain = re(enumShortcutsInEdit, val),
            'Model.Interface.ShortcutsTC[1].InSelector': (config, val) => config.ShortcutsTC1InSelector = re(enumShortcutsInSelector, val),
            'Model.Interface.ShortcutsTC[1].InMenu': (config, val) => config.ShortcutsTC1InMenu = re(enumShortcutsInMenu, val),

            'Model.Interface.ShortcutsTC[2].InStandby': (config, val) => config.ShortcutsTC2InStandby = re(enumClickAction, val),
            'Model.Interface.ShortcutsTC[2].InEditMain': (config, val) => config.ShortcutsTC2InEditMain = re(enumShortcutsInEdit, val),
            'Model.Interface.ShortcutsTC[2].InSelector': (config, val) => config.ShortcutsTC2InSelector = re(enumShortcutsInSelector, val),
            'Model.Interface.ShortcutsTC[2].InMenu': (config, val) => config.ShortcutsTC2InMenu = re(enumShortcutsInMenu, val),

            'Model.Interface.ClassicSkinVWLines.Line1': (config, val) => {
                config.ClassicSkinVWLine1 = reStartsWith(enumClassicLineContent, val);
                config.ClassicSkinVWLine1Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.ClassicSkinVWLines.Line2': (config, val) => {
                config.ClassicSkinVWLine2 = reStartsWith(enumClassicLineContent, val);
                config.ClassicSkinVWLine2Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.ClassicSkinVWLines.Line3': (config, val) => {
                config.ClassicSkinVWLine3 = reStartsWith(enumClassicLineContent, val);
                config.ClassicSkinVWLine3Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.ClassicSkinVWLines.Line4': (config, val) => {
                config.ClassicSkinVWLine4 = reStartsWith(enumClassicLineContent, val);
                config.ClassicSkinVWLine4Puff = val.endsWith('FireTimeMask');
            },

            'Model.Interface.ClassicSkinTCLines.Line1': (config, val) => {
                config.ClassicSkinTCLine1 = reStartsWith(enumClassicLineContent, val);
                config.ClassicSkinTCLine1Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.ClassicSkinTCLines.Line2': (config, val) => {
                config.ClassicSkinTCLine2 = reStartsWith(enumClassicLineContent, val);
                config.ClassicSkinTCLine2Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.ClassicSkinTCLines.Line3': (config, val) => {
                config.ClassicSkinTCLine3 = reStartsWith(enumClassicLineContent, val);
                config.ClassicSkinTCLine3Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.ClassicSkinTCLines.Line4': (config, val) => {
                config.ClassicSkinTCLine4 = reStartsWith(enumClassicLineContent, val);
                config.ClassicSkinTCLine4Puff = val.endsWith('FireTimeMask');
            },

            'Model.Interface.CircleSkinVWLines.Line1': (config, val) => {
                config.CircleSkinVWLine1 = reStartsWith(enumCircleLineContent, val);
            },
            'Model.Interface.CircleSkinVWLines.Line2': (config, val) => {
                config.CircleSkinVWLine2 = reStartsWith(enumCircleLineContent, val);
            },
            'Model.Interface.CircleSkinVWLines.Line3': (config, val) => {
                config.CircleSkinVWLine3 = reStartsWith(enumCircleLineContent, val);
                config.CircleSkinVWLine3Puff = val.endsWith('FireTimeMask');
            },

            'Model.Interface.CircleSkinTCLines.Line1': (config, val) => {
                config.CircleSkinTCLine1 = reStartsWith(enumCircleLineContent, val);
            },
            'Model.Interface.CircleSkinTCLines.Line2': (config, val) => {
                config.CircleSkinTCLine2 = reStartsWith(enumCircleLineContent, val);
            },
            'Model.Interface.CircleSkinTCLines.Line3': (config, val) => {
                config.CircleSkinTCLine3 = reStartsWith(enumCircleLineContent, val);
                config.CircleSkinTCLine3Puff = val.endsWith('FireTimeMask');
            },

            'Model.Interface.FoxySkinVWLines.Line1': (config, val) => {
                config.FoxySkinVWLine1 = reStartsWith(enumFoxyLineContent, val);
                config.FoxySkinVWLine1Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.FoxySkinVWLines.Line2': (config, val) => {
                config.FoxySkinVWLine2 = reStartsWith(enumFoxyLineContent, val);
                config.FoxySkinVWLine2Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.FoxySkinVWLines.Line3': (config, val) => {
                config.FoxySkinVWLine3 = reStartsWith(enumFoxyLineContent, val);
                config.FoxySkinVWLine3Puff = val.endsWith('FireTimeMask');
            },

            'Model.Interface.FoxySkinTCLines.Line1': (config, val) => {
                config.FoxySkinTCLine1 = reStartsWith(enumFoxyLineContent, val);
                config.FoxySkinTCLine1Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.FoxySkinTCLines.Line2': (config, val) => {
                config.FoxySkinTCLine2 = reStartsWith(enumFoxyLineContent, val);
                config.FoxySkinTCLine2Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.FoxySkinTCLines.Line3': (config, val) => {
                config.FoxySkinTCLine3 = reStartsWith(enumFoxyLineContent, val);
                config.FoxySkinTCLine3Puff = val.endsWith('FireTimeMask');
            },

            'Model.Interface.SmallSkinVWLines.Line1': (config, val) => {
                config.SmallSkinVWLine1 = reStartsWith(enumSmallLineContent, val);
                config.SmallSkinVWLine1Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.SmallSkinVWLines.Line2': (config, val) => {
                config.SmallSkinVWLine2 = reStartsWith(enumSmallLineContent, val);
                config.SmallSkinVWLine2Puff = val.endsWith('FireTimeMask');
            },

            'Model.Interface.SmallSkinTCLines.Line1': (config, val) => {
                config.SmallSkinTCLine1 = reStartsWith(enumSmallLineContent, val);
                config.SmallSkinTCLine1Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.SmallSkinTCLines.Line2': (config, val) => {
                config.SmallSkinTCLine2 = reStartsWith(enumSmallLineContent, val);
                config.SmallSkinTCLine2Puff = val.endsWith('FireTimeMask');
            },

            'Model.Interface.MediumSkinVWLines.Line1': (config, val) => {
                config.MediumSkinVWLine1 = reStartsWith(enumClassicLineContent, val);
                config.MediumSkinVWLine1Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.MediumSkinVWLines.Line2': (config, val) => {
                config.MediumSkinVWLine2 = reStartsWith(enumClassicLineContent, val);
                config.MediumSkinVWLine2Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.MediumSkinVWLines.Line3': (config, val) => {
                config.MediumSkinVWLine3 = reStartsWith(enumClassicLineContent, val);
                config.MediumSkinVWLine3Puff = val.endsWith('FireTimeMask');
            },

            'Model.Interface.MediumSkinTCLines.Line1': (config, val) => {
                config.MediumSkinTCLine1 = reStartsWith(enumClassicLineContent, val);
                config.MediumSkinTCLine1Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.MediumSkinTCLines.Line2': (config, val) => {
                config.MediumSkinTCLine2 = reStartsWith(enumClassicLineContent, val);
                config.MediumSkinTCLine2Puff = val.endsWith('FireTimeMask');
            },
            'Model.Interface.MediumSkinTCLines.Line3': (config, val) => {
                config.MediumSkinTCLine3 = reStartsWith(enumClassicLineContent, val);
                config.MediumSkinTCLine3Puff = val.endsWith('FireTimeMask');
            },


            'Model.Interface.Brightness': (config, val) => config.Brightness = Math.round(val / 2.55),
            'Model.Interface.DimTimeout': (config, val) => config.DimTimeout = Number(val),
            'Model.Interface.DimTimeoutLocked': (config, val) => config.DimTimeoutLocked = Number(val),
            'Model.Interface.DimTimeoutCharging': (config, val) => config.DimTimeoutCharging = Number(val),
            'Model.Interface.ShowLogoDelay': (config, val) => config.ShowLogoDelay = Number(val),
            'Model.Interface.ShowClockDelay': (config, val) => config.ShowClockDelay = Number(val),
            'Model.Interface.IsFlipped': (config, val) => config.IsFlipped = bool(val),
            'Model.Interface.IsStealthMode': (config, val) => config.IsStealthMode = bool(val),
            'Model.Interface.WakeUpByPlusMinus': (config, val) => config.WakeUpByPlusMinus = bool(val),
            'Model.Interface.ChargeScreenType': (config, val) => config.ChargeScreenType = re(enumChargeScreenType, val),
            'Model.Interface.ChargeExtraType': (config, val) => config.ChargeExtraType = re(enumChargeExtraType, val),
            'Model.Interface.IsLogoEnabled': (config, val) => config.IsLogoEnabled = bool(val),
            'Model.Interface.ClockType': (config, val) => config.ClockType = re(enumClockType, val),
            'Model.Interface.IsClockOnMainScreen': (config, val) => config.IsClockOnMainScreen = bool(val),
            'Model.Interface.ScreensaveDuration': (config, val) => config.ScreensaveDuration = Number(val),
            'Model.Interface.PuffScreenDelay': (config, val) => config.PuffScreenDelay = Math.round(val / 10),
            'Model.Interface.PuffsTimeFormat': (config, val) => config.PuffsTimeFormat = re(enumPuffsTimeFormat, val),
            'Model.Interface.MainScreenSkin': (config, val) => config.MainScreenSkin = re(enumSkin, val),
            'Model.Interface.IsUpDownSwapped': (config, val) => config.IsUpDownSwapped = bool(val),
            'Model.Interface.ShowChargingInStealth': (config, val) => config.ShowChargingInStealth = bool(val),
            'Model.Interface.ShowScreensaverInStealth': (config, val) => config.ShowScreensaverInStealth = bool(val),
            'Model.Interface.ClockOnClickInStealth': (config, val) => config.ClockOnClickInStealth = bool(val),
            'Model.Interface.FiveClicks': (config, val) => config.FiveClicks = re(enumFiveClicks, val),

            'Model.Interface.TemperatureUnits': (config, val) => config.TemperatureUnits = re(enumTemperatureUnits, val),
            'Model.Interface.DateFormat': (config, val) => config.DateFormat = re(enumDateFormat, val),
            'Model.Interface.TimeFormat': (config, val) => config.TimeFormat = re(enumTimeFormat, val),

            'Model.Counters.PuffsCount': (config, val) => config.PuffsCount = Number(val),
            'Model.Counters.PuffsTime': (config, val) => config.PuffsTime = Number(val),
            'Model.Counters.DateTime.Year': (config, val) => config.Year = Number(val),
            'Model.Counters.DateTime.Month': (config, val) => config.Month = Number(val),
            'Model.Counters.DateTime.Day': (config, val) => config.Day = Number(val),
            'Model.Counters.DateTime.Hour': (config, val) => config.Hour = Number(val),
            'Model.Counters.DateTime.Minute': (config, val) => config.Minute = Number(val),
            'Model.Counters.DateTime.Second': (config, val) => config.Second = Number(val),

            'Model.Advanced.ShuntCorrection': (config, val) => config.ShuntCorrection = Number(val),
            'Model.Advanced.BatteryModel': (config, val) => config.BatteryModel = re(enumBatteryModel, val),

            'Model.Advanced.ChargingCurrent': (config, val) => config.ChargingCurrent = Number(val),

            'Model.Advanced.CustomBatteryProfiles[0].Name': (config, val) => config.CustomBatteryProfiles[0].Name = val,
            'Model.Advanced.CustomBatteryProfiles[0].Data[0].Percents': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[0].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[0].Data[0].Voltage': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[0].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[0].Data[1].Percents': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[1].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[0].Data[1].Voltage': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[1].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[0].Data[2].Percents': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[2].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[0].Data[2].Voltage': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[2].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[0].Data[3].Percents': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[3].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[0].Data[3].Voltage': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[3].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[0].Data[4].Percents': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[4].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[0].Data[4].Voltage': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[4].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[0].Data[5].Percents': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[5].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[0].Data[5].Voltage': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[5].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[0].Data[6].Percents': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[6].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[0].Data[6].Voltage': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[6].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[0].Data[7].Percents': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[7].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[0].Data[7].Voltage': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[7].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[0].Data[8].Percents': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[8].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[0].Data[8].Voltage': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[8].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[0].Data[9].Percents': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[9].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[0].Data[9].Voltage': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[9].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[0].Data[10].Percents': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[10].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[0].Data[10].Voltage': (config, val) => config.CustomBatteryProfiles[0].PercentsVoltage[10].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[0].Cutoff': (config, val) => config.CustomBatteryProfiles[0].Cutoff = val / 100,

            'Model.Advanced.CustomBatteryProfiles[1].Name': (config, val) => config.CustomBatteryProfiles[1].Name = val,
            'Model.Advanced.CustomBatteryProfiles[1].Data[0].Percents': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[0].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[1].Data[0].Voltage': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[0].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[1].Data[1].Percents': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[1].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[1].Data[1].Voltage': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[1].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[1].Data[2].Percents': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[2].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[1].Data[2].Voltage': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[2].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[1].Data[3].Percents': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[3].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[1].Data[3].Voltage': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[3].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[1].Data[4].Percents': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[4].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[1].Data[4].Voltage': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[4].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[1].Data[5].Percents': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[5].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[1].Data[5].Voltage': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[5].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[1].Data[6].Percents': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[6].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[1].Data[6].Voltage': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[6].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[1].Data[7].Percents': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[7].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[1].Data[7].Voltage': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[7].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[1].Data[8].Percents': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[8].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[1].Data[8].Voltage': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[8].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[1].Data[9].Percents': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[9].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[1].Data[9].Voltage': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[9].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[1].Data[10].Percents': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[10].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[1].Data[10].Voltage': (config, val) => config.CustomBatteryProfiles[1].PercentsVoltage[10].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[1].Cutoff': (config, val) => config.CustomBatteryProfiles[1].Cutoff = val / 100,

            'Model.Advanced.CustomBatteryProfiles[2].Name': (config, val) => config.CustomBatteryProfiles[2].Name = val,
            'Model.Advanced.CustomBatteryProfiles[2].Data[0].Percents': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[0].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[2].Data[0].Voltage': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[0].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[2].Data[1].Percents': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[1].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[2].Data[1].Voltage': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[1].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[2].Data[2].Percents': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[2].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[2].Data[2].Voltage': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[2].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[2].Data[3].Percents': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[3].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[2].Data[3].Voltage': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[3].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[2].Data[4].Percents': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[4].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[2].Data[4].Voltage': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[4].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[2].Data[5].Percents': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[5].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[2].Data[5].Voltage': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[5].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[2].Data[6].Percents': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[6].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[2].Data[6].Voltage': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[6].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[2].Data[7].Percents': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[7].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[2].Data[7].Voltage': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[7].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[2].Data[8].Percents': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[8].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[2].Data[8].Voltage': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[8].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[2].Data[9].Percents': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[9].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[2].Data[9].Voltage': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[9].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[2].Data[10].Percents': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[10].Percents = Number(val),
            'Model.Advanced.CustomBatteryProfiles[2].Data[10].Voltage': (config, val) => config.CustomBatteryProfiles[2].PercentsVoltage[10].Voltage = val / 100,
            'Model.Advanced.CustomBatteryProfiles[2].Cutoff': (config, val) => config.CustomBatteryProfiles[2].Cutoff = val / 100,

            'Model.Advanced.RtcMode': (config, val) => config.RtcMode = re(enumRtcMode, val),
            'Model.Advanced.IsUsbCharge': (config, val) => config.IsUsbCharge = bool(val),
            'Model.Advanced.ResetCountersOnStartup': (config, val) => config.ResetCountersOnStartup = bool(val),

            'Model.Advanced.TFRTables[0].Name': (config, val) => config.TFRTables[0].Name = val,
            'Model.Advanced.TFRTables[0].Points[0].Temperature': (config, val) => config.TFRTables[0].Points[0].Temperature = Number(val),
            'Model.Advanced.TFRTables[0].Points[0].Factor': (config, val) => config.TFRTables[0].Points[0].Factor = val / 10000,
            'Model.Advanced.TFRTables[0].Points[1].Temperature': (config, val) => config.TFRTables[0].Points[1].Temperature = Number(val),
            'Model.Advanced.TFRTables[0].Points[1].Factor': (config, val) => config.TFRTables[0].Points[1].Factor = val / 10000,
            'Model.Advanced.TFRTables[0].Points[2].Temperature': (config, val) => config.TFRTables[0].Points[2].Temperature = Number(val),
            'Model.Advanced.TFRTables[0].Points[2].Factor': (config, val) => config.TFRTables[0].Points[2].Factor = val / 10000,
            'Model.Advanced.TFRTables[0].Points[3].Temperature': (config, val) => config.TFRTables[0].Points[3].Temperature = Number(val),
            'Model.Advanced.TFRTables[0].Points[3].Factor': (config, val) => config.TFRTables[0].Points[3].Factor = val / 10000,
            'Model.Advanced.TFRTables[0].Points[4].Temperature': (config, val) => config.TFRTables[0].Points[4].Temperature = Number(val),
            'Model.Advanced.TFRTables[0].Points[4].Factor': (config, val) => config.TFRTables[0].Points[4].Factor = val / 10000,
            'Model.Advanced.TFRTables[0].Points[5].Temperature': (config, val) => config.TFRTables[0].Points[5].Temperature = Number(val),
            'Model.Advanced.TFRTables[0].Points[5].Factor': (config, val) => config.TFRTables[0].Points[5].Factor = val / 10000,
            'Model.Advanced.TFRTables[0].Points[6].Temperature': (config, val) => config.TFRTables[0].Points[6].Temperature = Number(val),
            'Model.Advanced.TFRTables[0].Points[6].Factor': (config, val) => config.TFRTables[0].Points[6].Factor = val / 10000,
            'Model.Advanced.TFRTables[1].Name': (config, val) => config.TFRTables[1].Name = val,
            'Model.Advanced.TFRTables[1].Points[0].Temperature': (config, val) => config.TFRTables[1].Points[0].Temperature = Number(val),
            'Model.Advanced.TFRTables[1].Points[0].Factor': (config, val) => config.TFRTables[1].Points[0].Factor = val / 10000,
            'Model.Advanced.TFRTables[1].Points[1].Temperature': (config, val) => config.TFRTables[1].Points[1].Temperature = Number(val),
            'Model.Advanced.TFRTables[1].Points[1].Factor': (config, val) => config.TFRTables[1].Points[1].Factor = val / 10000,
            'Model.Advanced.TFRTables[1].Points[2].Temperature': (config, val) => config.TFRTables[1].Points[2].Temperature = Number(val),
            'Model.Advanced.TFRTables[1].Points[2].Factor': (config, val) => config.TFRTables[1].Points[2].Factor = val / 10000,
            'Model.Advanced.TFRTables[1].Points[3].Temperature': (config, val) => config.TFRTables[1].Points[3].Temperature = Number(val),
            'Model.Advanced.TFRTables[1].Points[3].Factor': (config, val) => config.TFRTables[1].Points[3].Factor = val / 10000,
            'Model.Advanced.TFRTables[1].Points[4].Temperature': (config, val) => config.TFRTables[1].Points[4].Temperature = Number(val),
            'Model.Advanced.TFRTables[1].Points[4].Factor': (config, val) => config.TFRTables[1].Points[4].Factor = val / 10000,
            'Model.Advanced.TFRTables[1].Points[5].Temperature': (config, val) => config.TFRTables[1].Points[5].Temperature = Number(val),
            'Model.Advanced.TFRTables[1].Points[5].Factor': (config, val) => config.TFRTables[1].Points[5].Factor = val / 10000,
            'Model.Advanced.TFRTables[1].Points[6].Temperature': (config, val) => config.TFRTables[1].Points[6].Temperature = Number(val),
            'Model.Advanced.TFRTables[1].Points[6].Factor': (config, val) => config.TFRTables[1].Points[6].Factor = val / 10000,
            'Model.Advanced.TFRTables[2].Name': (config, val) => config.TFRTables[2].Name = val,
            'Model.Advanced.TFRTables[2].Points[0].Temperature': (config, val) => config.TFRTables[2].Points[0].Temperature = Number(val),
            'Model.Advanced.TFRTables[2].Points[0].Factor': (config, val) => config.TFRTables[2].Points[0].Factor = val / 10000,
            'Model.Advanced.TFRTables[2].Points[1].Temperature': (config, val) => config.TFRTables[2].Points[1].Temperature = Number(val),
            'Model.Advanced.TFRTables[2].Points[1].Factor': (config, val) => config.TFRTables[2].Points[1].Factor = val / 10000,
            'Model.Advanced.TFRTables[2].Points[2].Temperature': (config, val) => config.TFRTables[2].Points[2].Temperature = Number(val),
            'Model.Advanced.TFRTables[2].Points[2].Factor': (config, val) => config.TFRTables[2].Points[2].Factor = val / 10000,
            'Model.Advanced.TFRTables[2].Points[3].Temperature': (config, val) => config.TFRTables[2].Points[3].Temperature = Number(val),
            'Model.Advanced.TFRTables[2].Points[3].Factor': (config, val) => config.TFRTables[2].Points[3].Factor = val / 10000,
            'Model.Advanced.TFRTables[2].Points[4].Temperature': (config, val) => config.TFRTables[2].Points[4].Temperature = Number(val),
            'Model.Advanced.TFRTables[2].Points[4].Factor': (config, val) => config.TFRTables[2].Points[4].Factor = val / 10000,
            'Model.Advanced.TFRTables[2].Points[5].Temperature': (config, val) => config.TFRTables[2].Points[5].Temperature = Number(val),
            'Model.Advanced.TFRTables[2].Points[5].Factor': (config, val) => config.TFRTables[2].Points[5].Factor = val / 10000,
            'Model.Advanced.TFRTables[2].Points[6].Temperature': (config, val) => config.TFRTables[2].Points[6].Temperature = Number(val),
            'Model.Advanced.TFRTables[2].Points[6].Factor': (config, val) => config.TFRTables[2].Points[6].Factor = val / 10000,
            'Model.Advanced.TFRTables[3].Name': (config, val) => config.TFRTables[3].Name = val,
            'Model.Advanced.TFRTables[3].Points[0].Temperature': (config, val) => config.TFRTables[3].Points[0].Temperature = Number(val),
            'Model.Advanced.TFRTables[3].Points[0].Factor': (config, val) => config.TFRTables[3].Points[0].Factor = val / 10000,
            'Model.Advanced.TFRTables[3].Points[1].Temperature': (config, val) => config.TFRTables[3].Points[1].Temperature = Number(val),
            'Model.Advanced.TFRTables[3].Points[1].Factor': (config, val) => config.TFRTables[3].Points[1].Factor = val / 10000,
            'Model.Advanced.TFRTables[3].Points[2].Temperature': (config, val) => config.TFRTables[3].Points[2].Temperature = Number(val),
            'Model.Advanced.TFRTables[3].Points[2].Factor': (config, val) => config.TFRTables[3].Points[2].Factor = val / 10000,
            'Model.Advanced.TFRTables[3].Points[3].Temperature': (config, val) => config.TFRTables[3].Points[3].Temperature = Number(val),
            'Model.Advanced.TFRTables[3].Points[3].Factor': (config, val) => config.TFRTables[3].Points[3].Factor = val / 10000,
            'Model.Advanced.TFRTables[3].Points[4].Temperature': (config, val) => config.TFRTables[3].Points[4].Temperature = Number(val),
            'Model.Advanced.TFRTables[3].Points[4].Factor': (config, val) => config.TFRTables[3].Points[4].Factor = val / 10000,
            'Model.Advanced.TFRTables[3].Points[5].Temperature': (config, val) => config.TFRTables[3].Points[5].Temperature = Number(val),
            'Model.Advanced.TFRTables[3].Points[5].Factor': (config, val) => config.TFRTables[3].Points[5].Factor = val / 10000,
            'Model.Advanced.TFRTables[3].Points[6].Temperature': (config, val) => config.TFRTables[3].Points[6].Temperature = Number(val),
            'Model.Advanced.TFRTables[3].Points[6].Factor': (config, val) => config.TFRTables[3].Points[6].Factor = val / 10000,
            'Model.Advanced.TFRTables[4].Name': (config, val) => config.TFRTables[4].Name = val,
            'Model.Advanced.TFRTables[4].Points[0].Temperature': (config, val) => config.TFRTables[4].Points[0].Temperature = Number(val),
            'Model.Advanced.TFRTables[4].Points[0].Factor': (config, val) => config.TFRTables[4].Points[0].Factor = val / 10000,
            'Model.Advanced.TFRTables[4].Points[1].Temperature': (config, val) => config.TFRTables[4].Points[1].Temperature = Number(val),
            'Model.Advanced.TFRTables[4].Points[1].Factor': (config, val) => config.TFRTables[4].Points[1].Factor = val / 10000,
            'Model.Advanced.TFRTables[4].Points[2].Temperature': (config, val) => config.TFRTables[4].Points[2].Temperature = Number(val),
            'Model.Advanced.TFRTables[4].Points[2].Factor': (config, val) => config.TFRTables[4].Points[2].Factor = val / 10000,
            'Model.Advanced.TFRTables[4].Points[3].Temperature': (config, val) => config.TFRTables[4].Points[3].Temperature = Number(val),
            'Model.Advanced.TFRTables[4].Points[3].Factor': (config, val) => config.TFRTables[4].Points[3].Factor = val / 10000,
            'Model.Advanced.TFRTables[4].Points[4].Temperature': (config, val) => config.TFRTables[4].Points[4].Temperature = Number(val),
            'Model.Advanced.TFRTables[4].Points[4].Factor': (config, val) => config.TFRTables[4].Points[4].Factor = val / 10000,
            'Model.Advanced.TFRTables[4].Points[5].Temperature': (config, val) => config.TFRTables[4].Points[5].Temperature = Number(val),
            'Model.Advanced.TFRTables[4].Points[5].Factor': (config, val) => config.TFRTables[4].Points[5].Factor = val / 10000,
            'Model.Advanced.TFRTables[4].Points[6].Temperature': (config, val) => config.TFRTables[4].Points[6].Temperature = Number(val),
            'Model.Advanced.TFRTables[4].Points[6].Factor': (config, val) => config.TFRTables[4].Points[6].Factor = val / 10000,
            'Model.Advanced.TFRTables[5].Name': (config, val) => config.TFRTables[5].Name = val,
            'Model.Advanced.TFRTables[5].Points[0].Temperature': (config, val) => config.TFRTables[5].Points[0].Temperature = Number(val),
            'Model.Advanced.TFRTables[5].Points[0].Factor': (config, val) => config.TFRTables[5].Points[0].Factor = val / 10000,
            'Model.Advanced.TFRTables[5].Points[1].Temperature': (config, val) => config.TFRTables[5].Points[1].Temperature = Number(val),
            'Model.Advanced.TFRTables[5].Points[1].Factor': (config, val) => config.TFRTables[5].Points[1].Factor = val / 10000,
            'Model.Advanced.TFRTables[5].Points[2].Temperature': (config, val) => config.TFRTables[5].Points[2].Temperature = Number(val),
            'Model.Advanced.TFRTables[5].Points[2].Factor': (config, val) => config.TFRTables[5].Points[2].Factor = val / 10000,
            'Model.Advanced.TFRTables[5].Points[3].Temperature': (config, val) => config.TFRTables[5].Points[3].Temperature = Number(val),
            'Model.Advanced.TFRTables[5].Points[3].Factor': (config, val) => config.TFRTables[5].Points[3].Factor = val / 10000,
            'Model.Advanced.TFRTables[5].Points[4].Temperature': (config, val) => config.TFRTables[5].Points[4].Temperature = Number(val),
            'Model.Advanced.TFRTables[5].Points[4].Factor': (config, val) => config.TFRTables[5].Points[4].Factor = val / 10000,
            'Model.Advanced.TFRTables[5].Points[5].Temperature': (config, val) => config.TFRTables[5].Points[5].Temperature = Number(val),
            'Model.Advanced.TFRTables[5].Points[5].Factor': (config, val) => config.TFRTables[5].Points[5].Factor = val / 10000,
            'Model.Advanced.TFRTables[5].Points[6].Temperature': (config, val) => config.TFRTables[5].Points[6].Temperature = Number(val),
            'Model.Advanced.TFRTables[5].Points[6].Factor': (config, val) => config.TFRTables[5].Points[6].Factor = val / 10000,
            'Model.Advanced.TFRTables[6].Name': (config, val) => config.TFRTables[6].Name = val,
            'Model.Advanced.TFRTables[6].Points[0].Temperature': (config, val) => config.TFRTables[6].Points[0].Temperature = Number(val),
            'Model.Advanced.TFRTables[6].Points[0].Factor': (config, val) => config.TFRTables[6].Points[0].Factor = val / 10000,
            'Model.Advanced.TFRTables[6].Points[1].Temperature': (config, val) => config.TFRTables[6].Points[1].Temperature = Number(val),
            'Model.Advanced.TFRTables[6].Points[1].Factor': (config, val) => config.TFRTables[6].Points[1].Factor = val / 10000,
            'Model.Advanced.TFRTables[6].Points[2].Temperature': (config, val) => config.TFRTables[6].Points[2].Temperature = Number(val),
            'Model.Advanced.TFRTables[6].Points[2].Factor': (config, val) => config.TFRTables[6].Points[2].Factor = val / 10000,
            'Model.Advanced.TFRTables[6].Points[3].Temperature': (config, val) => config.TFRTables[6].Points[3].Temperature = Number(val),
            'Model.Advanced.TFRTables[6].Points[3].Factor': (config, val) => config.TFRTables[6].Points[3].Factor = val / 10000,
            'Model.Advanced.TFRTables[6].Points[4].Temperature': (config, val) => config.TFRTables[6].Points[4].Temperature = Number(val),
            'Model.Advanced.TFRTables[6].Points[4].Factor': (config, val) => config.TFRTables[6].Points[4].Factor = val / 10000,
            'Model.Advanced.TFRTables[6].Points[5].Temperature': (config, val) => config.TFRTables[6].Points[5].Temperature = Number(val),
            'Model.Advanced.TFRTables[6].Points[5].Factor': (config, val) => config.TFRTables[6].Points[5].Factor = val / 10000,
            'Model.Advanced.TFRTables[6].Points[6].Temperature': (config, val) => config.TFRTables[6].Points[6].Temperature = Number(val),
            'Model.Advanced.TFRTables[6].Points[6].Factor': (config, val) => config.TFRTables[6].Points[6].Factor = val / 10000,
            'Model.Advanced.TFRTables[7].Name': (config, val) => config.TFRTables[7].Name = val,
            'Model.Advanced.TFRTables[7].Points[0].Temperature': (config, val) => config.TFRTables[7].Points[0].Temperature = Number(val),
            'Model.Advanced.TFRTables[7].Points[0].Factor': (config, val) => config.TFRTables[7].Points[0].Factor = val / 10000,
            'Model.Advanced.TFRTables[7].Points[1].Temperature': (config, val) => config.TFRTables[7].Points[1].Temperature = Number(val),
            'Model.Advanced.TFRTables[7].Points[1].Factor': (config, val) => config.TFRTables[7].Points[1].Factor = val / 10000,
            'Model.Advanced.TFRTables[7].Points[2].Temperature': (config, val) => config.TFRTables[7].Points[2].Temperature = Number(val),
            'Model.Advanced.TFRTables[7].Points[2].Factor': (config, val) => config.TFRTables[7].Points[2].Factor = val / 10000,
            'Model.Advanced.TFRTables[7].Points[3].Temperature': (config, val) => config.TFRTables[7].Points[3].Temperature = Number(val),
            'Model.Advanced.TFRTables[7].Points[3].Factor': (config, val) => config.TFRTables[7].Points[3].Factor = val / 10000,
            'Model.Advanced.TFRTables[7].Points[4].Temperature': (config, val) => config.TFRTables[7].Points[4].Temperature = Number(val),
            'Model.Advanced.TFRTables[7].Points[4].Factor': (config, val) => config.TFRTables[7].Points[4].Factor = val / 10000,
            'Model.Advanced.TFRTables[7].Points[5].Temperature': (config, val) => config.TFRTables[7].Points[5].Temperature = Number(val),
            'Model.Advanced.TFRTables[7].Points[5].Factor': (config, val) => config.TFRTables[7].Points[5].Factor = val / 10000,
            'Model.Advanced.TFRTables[7].Points[6].Temperature': (config, val) => config.TFRTables[7].Points[6].Temperature = Number(val),
            'Model.Advanced.TFRTables[7].Points[6].Factor': (config, val) => config.TFRTables[7].Points[6].Factor = val / 10000,

            'Model.Advanced.PuffCutOff': (config, val) => config.PuffCutOff = val / 10,

            'Model.Advanced.PowerCurves[0].Name': (config, val) => config.PowerCurves[0].Name = val,
            'Model.Advanced.PowerCurves[0].Points[0].Time': (config, val) => config.PowerCurves[0].Points[0].Time = val / 10,
            'Model.Advanced.PowerCurves[0].Points[0].Percent': (config, val) => config.PowerCurves[0].Points[0].Percent = Number(val),
            'Model.Advanced.PowerCurves[0].Points[1].Time': (config, val) => config.PowerCurves[0].Points[1].Time = val / 10,
            'Model.Advanced.PowerCurves[0].Points[1].Percent': (config, val) => config.PowerCurves[0].Points[1].Percent = Number(val),
            'Model.Advanced.PowerCurves[0].Points[2].Time': (config, val) => config.PowerCurves[0].Points[2].Time = val / 10,
            'Model.Advanced.PowerCurves[0].Points[2].Percent': (config, val) => config.PowerCurves[0].Points[2].Percent = Number(val),
            'Model.Advanced.PowerCurves[0].Points[3].Time': (config, val) => config.PowerCurves[0].Points[3].Time = val / 10,
            'Model.Advanced.PowerCurves[0].Points[3].Percent': (config, val) => config.PowerCurves[0].Points[3].Percent = Number(val),
            'Model.Advanced.PowerCurves[0].Points[4].Time': (config, val) => config.PowerCurves[0].Points[4].Time = val / 10,
            'Model.Advanced.PowerCurves[0].Points[4].Percent': (config, val) => config.PowerCurves[0].Points[4].Percent = Number(val),
            'Model.Advanced.PowerCurves[0].Points[5].Time': (config, val) => config.PowerCurves[0].Points[5].Time = val / 10,
            'Model.Advanced.PowerCurves[0].Points[5].Percent': (config, val) => config.PowerCurves[0].Points[5].Percent = Number(val),
            'Model.Advanced.PowerCurves[0].Points[6].Time': (config, val) => config.PowerCurves[0].Points[6].Time = val / 10,
            'Model.Advanced.PowerCurves[0].Points[6].Percent': (config, val) => config.PowerCurves[0].Points[6].Percent = Number(val),
            'Model.Advanced.PowerCurves[0].Points[7].Time': (config, val) => config.PowerCurves[0].Points[7].Time = val / 10,
            'Model.Advanced.PowerCurves[0].Points[7].Percent': (config, val) => config.PowerCurves[0].Points[7].Percent = Number(val),
            'Model.Advanced.PowerCurves[0].Points[8].Time': (config, val) => config.PowerCurves[0].Points[8].Time = val / 10,
            'Model.Advanced.PowerCurves[0].Points[8].Percent': (config, val) => config.PowerCurves[0].Points[8].Percent = Number(val),
            'Model.Advanced.PowerCurves[0].Points[9].Time': (config, val) => config.PowerCurves[0].Points[9].Time = val / 10,
            'Model.Advanced.PowerCurves[0].Points[9].Percent': (config, val) => config.PowerCurves[0].Points[9].Percent = Number(val),
            'Model.Advanced.PowerCurves[0].Points[10].Time': (config, val) => config.PowerCurves[0].Points[10].Time = val / 10,
            'Model.Advanced.PowerCurves[0].Points[10].Percent': (config, val) => config.PowerCurves[0].Points[10].Percent = Number(val),
            'Model.Advanced.PowerCurves[0].Points[11].Time': (config, val) => config.PowerCurves[0].Points[11].Time = val / 10,
            'Model.Advanced.PowerCurves[0].Points[11].Percent': (config, val) => config.PowerCurves[0].Points[11].Percent = Number(val),

            'Model.Advanced.PowerCurves[1].Name': (config, val) => config.PowerCurves[1].Name = val,
            'Model.Advanced.PowerCurves[1].Points[0].Time': (config, val) => config.PowerCurves[1].Points[0].Time = val / 10,
            'Model.Advanced.PowerCurves[1].Points[0].Percent': (config, val) => config.PowerCurves[1].Points[0].Percent = Number(val),
            'Model.Advanced.PowerCurves[1].Points[1].Time': (config, val) => config.PowerCurves[1].Points[1].Time = val / 10,
            'Model.Advanced.PowerCurves[1].Points[1].Percent': (config, val) => config.PowerCurves[1].Points[1].Percent = Number(val),
            'Model.Advanced.PowerCurves[1].Points[2].Time': (config, val) => config.PowerCurves[1].Points[2].Time = val / 10,
            'Model.Advanced.PowerCurves[1].Points[2].Percent': (config, val) => config.PowerCurves[1].Points[2].Percent = Number(val),
            'Model.Advanced.PowerCurves[1].Points[3].Time': (config, val) => config.PowerCurves[1].Points[3].Time = val / 10,
            'Model.Advanced.PowerCurves[1].Points[3].Percent': (config, val) => config.PowerCurves[1].Points[3].Percent = Number(val),
            'Model.Advanced.PowerCurves[1].Points[4].Time': (config, val) => config.PowerCurves[1].Points[4].Time = val / 10,
            'Model.Advanced.PowerCurves[1].Points[4].Percent': (config, val) => config.PowerCurves[1].Points[4].Percent = Number(val),
            'Model.Advanced.PowerCurves[1].Points[5].Time': (config, val) => config.PowerCurves[1].Points[5].Time = val / 10,
            'Model.Advanced.PowerCurves[1].Points[5].Percent': (config, val) => config.PowerCurves[1].Points[5].Percent = Number(val),
            'Model.Advanced.PowerCurves[1].Points[6].Time': (config, val) => config.PowerCurves[1].Points[6].Time = val / 10,
            'Model.Advanced.PowerCurves[1].Points[6].Percent': (config, val) => config.PowerCurves[1].Points[6].Percent = Number(val),
            'Model.Advanced.PowerCurves[1].Points[7].Time': (config, val) => config.PowerCurves[1].Points[7].Time = val / 10,
            'Model.Advanced.PowerCurves[1].Points[7].Percent': (config, val) => config.PowerCurves[1].Points[7].Percent = Number(val),
            'Model.Advanced.PowerCurves[1].Points[8].Time': (config, val) => config.PowerCurves[1].Points[8].Time = val / 10,
            'Model.Advanced.PowerCurves[1].Points[8].Percent': (config, val) => config.PowerCurves[1].Points[8].Percent = Number(val),
            'Model.Advanced.PowerCurves[1].Points[9].Time': (config, val) => config.PowerCurves[1].Points[9].Time = val / 10,
            'Model.Advanced.PowerCurves[1].Points[9].Percent': (config, val) => config.PowerCurves[1].Points[9].Percent = Number(val),
            'Model.Advanced.PowerCurves[1].Points[10].Time': (config, val) => config.PowerCurves[1].Points[10].Time = val / 10,
            'Model.Advanced.PowerCurves[1].Points[10].Percent': (config, val) => config.PowerCurves[1].Points[10].Percent = Number(val),
            'Model.Advanced.PowerCurves[1].Points[11].Time': (config, val) => config.PowerCurves[1].Points[11].Time = val / 10,
            'Model.Advanced.PowerCurves[1].Points[11].Percent': (config, val) => config.PowerCurves[1].Points[11].Percent = Number(val),

            'Model.Advanced.PowerCurves[2].Name': (config, val) => config.PowerCurves[2].Name = val,
            'Model.Advanced.PowerCurves[2].Points[0].Time': (config, val) => config.PowerCurves[2].Points[0].Time = val / 10,
            'Model.Advanced.PowerCurves[2].Points[0].Percent': (config, val) => config.PowerCurves[2].Points[0].Percent = Number(val),
            'Model.Advanced.PowerCurves[2].Points[1].Time': (config, val) => config.PowerCurves[2].Points[1].Time = val / 10,
            'Model.Advanced.PowerCurves[2].Points[1].Percent': (config, val) => config.PowerCurves[2].Points[1].Percent = Number(val),
            'Model.Advanced.PowerCurves[2].Points[2].Time': (config, val) => config.PowerCurves[2].Points[2].Time = val / 10,
            'Model.Advanced.PowerCurves[2].Points[2].Percent': (config, val) => config.PowerCurves[2].Points[2].Percent = Number(val),
            'Model.Advanced.PowerCurves[2].Points[3].Time': (config, val) => config.PowerCurves[2].Points[3].Time = val / 10,
            'Model.Advanced.PowerCurves[2].Points[3].Percent': (config, val) => config.PowerCurves[2].Points[3].Percent = Number(val),
            'Model.Advanced.PowerCurves[2].Points[4].Time': (config, val) => config.PowerCurves[2].Points[4].Time = val / 10,
            'Model.Advanced.PowerCurves[2].Points[4].Percent': (config, val) => config.PowerCurves[2].Points[4].Percent = Number(val),
            'Model.Advanced.PowerCurves[2].Points[5].Time': (config, val) => config.PowerCurves[2].Points[5].Time = val / 10,
            'Model.Advanced.PowerCurves[2].Points[5].Percent': (config, val) => config.PowerCurves[2].Points[5].Percent = Number(val),
            'Model.Advanced.PowerCurves[2].Points[6].Time': (config, val) => config.PowerCurves[2].Points[6].Time = val / 10,
            'Model.Advanced.PowerCurves[2].Points[6].Percent': (config, val) => config.PowerCurves[2].Points[6].Percent = Number(val),
            'Model.Advanced.PowerCurves[2].Points[7].Time': (config, val) => config.PowerCurves[2].Points[7].Time = val / 10,
            'Model.Advanced.PowerCurves[2].Points[7].Percent': (config, val) => config.PowerCurves[2].Points[7].Percent = Number(val),
            'Model.Advanced.PowerCurves[2].Points[8].Time': (config, val) => config.PowerCurves[2].Points[8].Time = val / 10,
            'Model.Advanced.PowerCurves[2].Points[8].Percent': (config, val) => config.PowerCurves[2].Points[8].Percent = Number(val),
            'Model.Advanced.PowerCurves[2].Points[9].Time': (config, val) => config.PowerCurves[2].Points[9].Time = val / 10,
            'Model.Advanced.PowerCurves[2].Points[9].Percent': (config, val) => config.PowerCurves[2].Points[9].Percent = Number(val),
            'Model.Advanced.PowerCurves[2].Points[10].Time': (config, val) => config.PowerCurves[2].Points[10].Time = val / 10,
            'Model.Advanced.PowerCurves[2].Points[10].Percent': (config, val) => config.PowerCurves[2].Points[10].Percent = Number(val),
            'Model.Advanced.PowerCurves[2].Points[11].Time': (config, val) => config.PowerCurves[2].Points[11].Time = val / 10,
            'Model.Advanced.PowerCurves[2].Points[11].Percent': (config, val) => config.PowerCurves[2].Points[11].Percent = Number(val),

            'Model.Advanced.PowerCurves[3].Name': (config, val) => config.PowerCurves[3].Name = val,
            'Model.Advanced.PowerCurves[3].Points[0].Time': (config, val) => config.PowerCurves[3].Points[0].Time = val / 10,
            'Model.Advanced.PowerCurves[3].Points[0].Percent': (config, val) => config.PowerCurves[3].Points[0].Percent = Number(val),
            'Model.Advanced.PowerCurves[3].Points[1].Time': (config, val) => config.PowerCurves[3].Points[1].Time = val / 10,
            'Model.Advanced.PowerCurves[3].Points[1].Percent': (config, val) => config.PowerCurves[3].Points[1].Percent = Number(val),
            'Model.Advanced.PowerCurves[3].Points[2].Time': (config, val) => config.PowerCurves[3].Points[2].Time = val / 10,
            'Model.Advanced.PowerCurves[3].Points[2].Percent': (config, val) => config.PowerCurves[3].Points[2].Percent = Number(val),
            'Model.Advanced.PowerCurves[3].Points[3].Time': (config, val) => config.PowerCurves[3].Points[3].Time = val / 10,
            'Model.Advanced.PowerCurves[3].Points[3].Percent': (config, val) => config.PowerCurves[3].Points[3].Percent = Number(val),
            'Model.Advanced.PowerCurves[3].Points[4].Time': (config, val) => config.PowerCurves[3].Points[4].Time = val / 10,
            'Model.Advanced.PowerCurves[3].Points[4].Percent': (config, val) => config.PowerCurves[3].Points[4].Percent = Number(val),
            'Model.Advanced.PowerCurves[3].Points[5].Time': (config, val) => config.PowerCurves[3].Points[5].Time = val / 10,
            'Model.Advanced.PowerCurves[3].Points[5].Percent': (config, val) => config.PowerCurves[3].Points[5].Percent = Number(val),
            'Model.Advanced.PowerCurves[3].Points[6].Time': (config, val) => config.PowerCurves[3].Points[6].Time = val / 10,
            'Model.Advanced.PowerCurves[3].Points[6].Percent': (config, val) => config.PowerCurves[3].Points[6].Percent = Number(val),
            'Model.Advanced.PowerCurves[3].Points[7].Time': (config, val) => config.PowerCurves[3].Points[7].Time = val / 10,
            'Model.Advanced.PowerCurves[3].Points[7].Percent': (config, val) => config.PowerCurves[3].Points[7].Percent = Number(val),
            'Model.Advanced.PowerCurves[3].Points[8].Time': (config, val) => config.PowerCurves[3].Points[8].Time = val / 10,
            'Model.Advanced.PowerCurves[3].Points[8].Percent': (config, val) => config.PowerCurves[3].Points[8].Percent = Number(val),
            'Model.Advanced.PowerCurves[3].Points[9].Time': (config, val) => config.PowerCurves[3].Points[9].Time = val / 10,
            'Model.Advanced.PowerCurves[3].Points[9].Percent': (config, val) => config.PowerCurves[3].Points[9].Percent = Number(val),
            'Model.Advanced.PowerCurves[3].Points[10].Time': (config, val) => config.PowerCurves[3].Points[10].Time = val / 10,
            'Model.Advanced.PowerCurves[3].Points[10].Percent': (config, val) => config.PowerCurves[3].Points[10].Percent = Number(val),
            'Model.Advanced.PowerCurves[3].Points[11].Time': (config, val) => config.PowerCurves[3].Points[11].Time = val / 10,
            'Model.Advanced.PowerCurves[3].Points[11].Percent': (config, val) => config.PowerCurves[3].Points[11].Percent = Number(val),

            'Model.Advanced.PowerCurves[4].Name': (config, val) => config.PowerCurves[4].Name = val,
            'Model.Advanced.PowerCurves[4].Points[0].Time': (config, val) => config.PowerCurves[4].Points[0].Time = val / 10,
            'Model.Advanced.PowerCurves[4].Points[0].Percent': (config, val) => config.PowerCurves[4].Points[0].Percent = Number(val),
            'Model.Advanced.PowerCurves[4].Points[1].Time': (config, val) => config.PowerCurves[4].Points[1].Time = val / 10,
            'Model.Advanced.PowerCurves[4].Points[1].Percent': (config, val) => config.PowerCurves[4].Points[1].Percent = Number(val),
            'Model.Advanced.PowerCurves[4].Points[2].Time': (config, val) => config.PowerCurves[4].Points[2].Time = val / 10,
            'Model.Advanced.PowerCurves[4].Points[2].Percent': (config, val) => config.PowerCurves[4].Points[2].Percent = Number(val),
            'Model.Advanced.PowerCurves[4].Points[3].Time': (config, val) => config.PowerCurves[4].Points[3].Time = val / 10,
            'Model.Advanced.PowerCurves[4].Points[3].Percent': (config, val) => config.PowerCurves[4].Points[3].Percent = Number(val),
            'Model.Advanced.PowerCurves[4].Points[4].Time': (config, val) => config.PowerCurves[4].Points[4].Time = val / 10,
            'Model.Advanced.PowerCurves[4].Points[4].Percent': (config, val) => config.PowerCurves[4].Points[4].Percent = Number(val),
            'Model.Advanced.PowerCurves[4].Points[5].Time': (config, val) => config.PowerCurves[4].Points[5].Time = val / 10,
            'Model.Advanced.PowerCurves[4].Points[5].Percent': (config, val) => config.PowerCurves[4].Points[5].Percent = Number(val),
            'Model.Advanced.PowerCurves[4].Points[6].Time': (config, val) => config.PowerCurves[4].Points[6].Time = val / 10,
            'Model.Advanced.PowerCurves[4].Points[6].Percent': (config, val) => config.PowerCurves[4].Points[6].Percent = Number(val),
            'Model.Advanced.PowerCurves[4].Points[7].Time': (config, val) => config.PowerCurves[4].Points[7].Time = val / 10,
            'Model.Advanced.PowerCurves[4].Points[7].Percent': (config, val) => config.PowerCurves[4].Points[7].Percent = Number(val),
            'Model.Advanced.PowerCurves[4].Points[8].Time': (config, val) => config.PowerCurves[4].Points[8].Time = val / 10,
            'Model.Advanced.PowerCurves[4].Points[8].Percent': (config, val) => config.PowerCurves[4].Points[8].Percent = Number(val),
            'Model.Advanced.PowerCurves[4].Points[9].Time': (config, val) => config.PowerCurves[4].Points[9].Time = val / 10,
            'Model.Advanced.PowerCurves[4].Points[9].Percent': (config, val) => config.PowerCurves[4].Points[9].Percent = Number(val),
            'Model.Advanced.PowerCurves[4].Points[10].Time': (config, val) => config.PowerCurves[4].Points[10].Time = val / 10,
            'Model.Advanced.PowerCurves[4].Points[10].Percent': (config, val) => config.PowerCurves[4].Points[10].Percent = Number(val),
            'Model.Advanced.PowerCurves[4].Points[11].Time': (config, val) => config.PowerCurves[4].Points[11].Time = val / 10,
            'Model.Advanced.PowerCurves[4].Points[11].Percent': (config, val) => config.PowerCurves[4].Points[11].Percent = Number(val),

            'Model.Advanced.PowerCurves[5].Name': (config, val) => config.PowerCurves[5].Name = val,
            'Model.Advanced.PowerCurves[5].Points[0].Time': (config, val) => config.PowerCurves[5].Points[0].Time = val / 10,
            'Model.Advanced.PowerCurves[5].Points[0].Percent': (config, val) => config.PowerCurves[5].Points[0].Percent = Number(val),
            'Model.Advanced.PowerCurves[5].Points[1].Time': (config, val) => config.PowerCurves[5].Points[1].Time = val / 10,
            'Model.Advanced.PowerCurves[5].Points[1].Percent': (config, val) => config.PowerCurves[5].Points[1].Percent = Number(val),
            'Model.Advanced.PowerCurves[5].Points[2].Time': (config, val) => config.PowerCurves[5].Points[2].Time = val / 10,
            'Model.Advanced.PowerCurves[5].Points[2].Percent': (config, val) => config.PowerCurves[5].Points[2].Percent = Number(val),
            'Model.Advanced.PowerCurves[5].Points[3].Time': (config, val) => config.PowerCurves[5].Points[3].Time = val / 10,
            'Model.Advanced.PowerCurves[5].Points[3].Percent': (config, val) => config.PowerCurves[5].Points[3].Percent = Number(val),
            'Model.Advanced.PowerCurves[5].Points[4].Time': (config, val) => config.PowerCurves[5].Points[4].Time = val / 10,
            'Model.Advanced.PowerCurves[5].Points[4].Percent': (config, val) => config.PowerCurves[5].Points[4].Percent = Number(val),
            'Model.Advanced.PowerCurves[5].Points[5].Time': (config, val) => config.PowerCurves[5].Points[5].Time = val / 10,
            'Model.Advanced.PowerCurves[5].Points[5].Percent': (config, val) => config.PowerCurves[5].Points[5].Percent = Number(val),
            'Model.Advanced.PowerCurves[5].Points[6].Time': (config, val) => config.PowerCurves[5].Points[6].Time = val / 10,
            'Model.Advanced.PowerCurves[5].Points[6].Percent': (config, val) => config.PowerCurves[5].Points[6].Percent = Number(val),
            'Model.Advanced.PowerCurves[5].Points[7].Time': (config, val) => config.PowerCurves[5].Points[7].Time = val / 10,
            'Model.Advanced.PowerCurves[5].Points[7].Percent': (config, val) => config.PowerCurves[5].Points[7].Percent = Number(val),
            'Model.Advanced.PowerCurves[5].Points[8].Time': (config, val) => config.PowerCurves[5].Points[8].Time = val / 10,
            'Model.Advanced.PowerCurves[5].Points[8].Percent': (config, val) => config.PowerCurves[5].Points[8].Percent = Number(val),
            'Model.Advanced.PowerCurves[5].Points[9].Time': (config, val) => config.PowerCurves[5].Points[9].Time = val / 10,
            'Model.Advanced.PowerCurves[5].Points[9].Percent': (config, val) => config.PowerCurves[5].Points[9].Percent = Number(val),
            'Model.Advanced.PowerCurves[5].Points[10].Time': (config, val) => config.PowerCurves[5].Points[10].Time = val / 10,
            'Model.Advanced.PowerCurves[5].Points[10].Percent': (config, val) => config.PowerCurves[5].Points[10].Percent = Number(val),
            'Model.Advanced.PowerCurves[5].Points[11].Time': (config, val) => config.PowerCurves[5].Points[11].Time = val / 10,
            'Model.Advanced.PowerCurves[5].Points[11].Percent': (config, val) => config.PowerCurves[5].Points[11].Percent = Number(val),

            'Model.Advanced.PowerCurves[6].Name': (config, val) => config.PowerCurves[6].Name = val,
            'Model.Advanced.PowerCurves[6].Points[0].Time': (config, val) => config.PowerCurves[6].Points[0].Time = val / 10,
            'Model.Advanced.PowerCurves[6].Points[0].Percent': (config, val) => config.PowerCurves[6].Points[0].Percent = Number(val),
            'Model.Advanced.PowerCurves[6].Points[1].Time': (config, val) => config.PowerCurves[6].Points[1].Time = val / 10,
            'Model.Advanced.PowerCurves[6].Points[1].Percent': (config, val) => config.PowerCurves[6].Points[1].Percent = Number(val),
            'Model.Advanced.PowerCurves[6].Points[2].Time': (config, val) => config.PowerCurves[6].Points[2].Time = val / 10,
            'Model.Advanced.PowerCurves[6].Points[2].Percent': (config, val) => config.PowerCurves[6].Points[2].Percent = Number(val),
            'Model.Advanced.PowerCurves[6].Points[3].Time': (config, val) => config.PowerCurves[6].Points[3].Time = val / 10,
            'Model.Advanced.PowerCurves[6].Points[3].Percent': (config, val) => config.PowerCurves[6].Points[3].Percent = Number(val),
            'Model.Advanced.PowerCurves[6].Points[4].Time': (config, val) => config.PowerCurves[6].Points[4].Time = val / 10,
            'Model.Advanced.PowerCurves[6].Points[4].Percent': (config, val) => config.PowerCurves[6].Points[4].Percent = Number(val),
            'Model.Advanced.PowerCurves[6].Points[5].Time': (config, val) => config.PowerCurves[6].Points[5].Time = val / 10,
            'Model.Advanced.PowerCurves[6].Points[5].Percent': (config, val) => config.PowerCurves[6].Points[5].Percent = Number(val),
            'Model.Advanced.PowerCurves[6].Points[6].Time': (config, val) => config.PowerCurves[6].Points[6].Time = val / 10,
            'Model.Advanced.PowerCurves[6].Points[6].Percent': (config, val) => config.PowerCurves[6].Points[6].Percent = Number(val),
            'Model.Advanced.PowerCurves[6].Points[7].Time': (config, val) => config.PowerCurves[6].Points[7].Time = val / 10,
            'Model.Advanced.PowerCurves[6].Points[7].Percent': (config, val) => config.PowerCurves[6].Points[7].Percent = Number(val),
            'Model.Advanced.PowerCurves[6].Points[8].Time': (config, val) => config.PowerCurves[6].Points[8].Time = val / 10,
            'Model.Advanced.PowerCurves[6].Points[8].Percent': (config, val) => config.PowerCurves[6].Points[8].Percent = Number(val),
            'Model.Advanced.PowerCurves[6].Points[9].Time': (config, val) => config.PowerCurves[6].Points[9].Time = val / 10,
            'Model.Advanced.PowerCurves[6].Points[9].Percent': (config, val) => config.PowerCurves[6].Points[9].Percent = Number(val),
            'Model.Advanced.PowerCurves[6].Points[10].Time': (config, val) => config.PowerCurves[6].Points[10].Time = val / 10,
            'Model.Advanced.PowerCurves[6].Points[10].Percent': (config, val) => config.PowerCurves[6].Points[10].Percent = Number(val),
            'Model.Advanced.PowerCurves[6].Points[11].Time': (config, val) => config.PowerCurves[6].Points[11].Time = val / 10,
            'Model.Advanced.PowerCurves[6].Points[11].Percent': (config, val) => config.PowerCurves[6].Points[11].Percent = Number(val),

            'Model.Advanced.PowerCurves[7].Name': (config, val) => config.PowerCurves[7].Name = val,
            'Model.Advanced.PowerCurves[7].Points[0].Time': (config, val) => config.PowerCurves[7].Points[0].Time = val / 10,
            'Model.Advanced.PowerCurves[7].Points[0].Percent': (config, val) => config.PowerCurves[7].Points[0].Percent = Number(val),
            'Model.Advanced.PowerCurves[7].Points[1].Time': (config, val) => config.PowerCurves[7].Points[1].Time = val / 10,
            'Model.Advanced.PowerCurves[7].Points[1].Percent': (config, val) => config.PowerCurves[7].Points[1].Percent = Number(val),
            'Model.Advanced.PowerCurves[7].Points[2].Time': (config, val) => config.PowerCurves[7].Points[2].Time = val / 10,
            'Model.Advanced.PowerCurves[7].Points[2].Percent': (config, val) => config.PowerCurves[7].Points[2].Percent = Number(val),
            'Model.Advanced.PowerCurves[7].Points[3].Time': (config, val) => config.PowerCurves[7].Points[3].Time = val / 10,
            'Model.Advanced.PowerCurves[7].Points[3].Percent': (config, val) => config.PowerCurves[7].Points[3].Percent = Number(val),
            'Model.Advanced.PowerCurves[7].Points[4].Time': (config, val) => config.PowerCurves[7].Points[4].Time = val / 10,
            'Model.Advanced.PowerCurves[7].Points[4].Percent': (config, val) => config.PowerCurves[7].Points[4].Percent = Number(val),
            'Model.Advanced.PowerCurves[7].Points[5].Time': (config, val) => config.PowerCurves[7].Points[5].Time = val / 10,
            'Model.Advanced.PowerCurves[7].Points[5].Percent': (config, val) => config.PowerCurves[7].Points[5].Percent = Number(val),
            'Model.Advanced.PowerCurves[7].Points[6].Time': (config, val) => config.PowerCurves[7].Points[6].Time = val / 10,
            'Model.Advanced.PowerCurves[7].Points[6].Percent': (config, val) => config.PowerCurves[7].Points[6].Percent = Number(val),
            'Model.Advanced.PowerCurves[7].Points[7].Time': (config, val) => config.PowerCurves[7].Points[7].Time = val / 10,
            'Model.Advanced.PowerCurves[7].Points[7].Percent': (config, val) => config.PowerCurves[7].Points[7].Percent = Number(val),
            'Model.Advanced.PowerCurves[7].Points[8].Time': (config, val) => config.PowerCurves[7].Points[8].Time = val / 10,
            'Model.Advanced.PowerCurves[7].Points[8].Percent': (config, val) => config.PowerCurves[7].Points[8].Percent = Number(val),
            'Model.Advanced.PowerCurves[7].Points[9].Time': (config, val) => config.PowerCurves[7].Points[9].Time = val / 10,
            'Model.Advanced.PowerCurves[7].Points[9].Percent': (config, val) => config.PowerCurves[7].Points[9].Percent = Number(val),
            'Model.Advanced.PowerCurves[7].Points[10].Time': (config, val) => config.PowerCurves[7].Points[10].Time = val / 10,
            'Model.Advanced.PowerCurves[7].Points[10].Percent': (config, val) => config.PowerCurves[7].Points[10].Percent = Number(val),
            'Model.Advanced.PowerCurves[7].Points[11].Time': (config, val) => config.PowerCurves[7].Points[11].Time = val / 10,
            'Model.Advanced.PowerCurves[7].Points[11].Percent': (config, val) => config.PowerCurves[7].Points[11].Percent = Number(val),

            'Model.Advanced.BatteryVoltageOffsets[0]': (config, val) => config.BatteryVoltageOffset1 = Number(val),
            'Model.Advanced.BatteryVoltageOffsets[1]': (config, val) => config.BatteryVoltageOffset2 = Number(val),
            'Model.Advanced.BatteryVoltageOffsets[2]': (config, val) => config.BatteryVoltageOffset3 = Number(val),
            'Model.Advanced.BatteryVoltageOffsets[3]': (config, val) => config.BatteryVoltageOffset4 = Number(val),

            'Model.Advanced.UsbNoSleep': (config, val) => config.UsbNoSleep = bool(val),
            'Model.Advanced.DeepSleepMode': (config, val) => config.DeepSleepMode = re(enumDeepSleepMode, val),
            'Model.Advanced.DeepSleepDelay': (config, val) => config.DeepSleepDelay = Number(val),
            'Model.Advanced.PowerLimit': (config, val) => config.PowerLimit = val / 10,
            'Model.Advanced.InternalResistance': (config, val) => config.InternalResistance = Number(val),
        };

        xml2js.parseString(xml, (err, data) => {
            if (err) {
                cb(err);
                return;
            }

            const config = {
                profiles: [{}, {}, {}, {}, {}, {}, {}, {}],
                CustomBatteryProfiles: [
                    {PercentsVoltage: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]},
                    {PercentsVoltage: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]},
                    {PercentsVoltage: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]}
                ],
                TFRTables: [
                    {Points: [{}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}]}
                ],
                PowerCurves: [
                    {Points: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]},
                    {Points: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
                ]
            };

            data.SerializableConfiguration.Data[0].Item.forEach(item => {
                if (map[item.$.Key]) {
                    map[item.$.Key](config, item.$.Value);
                }
            });

            cb(null, config);
        });
    }
}

module.exports = AfcFile;

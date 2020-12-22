# DSP Tutorial

## Example 01 - Mute

To mute an audio source is simple, set every sample equal to 0.

```cpp
void mute(array<double>& ioSample)
{
    // zero outputs
    for (uint i=0; i < audioOutputsCount; i++)
    {
        ioSample[i] = 0;
    }
}
```

## Example 02 - Gain

To change the gain of an audio source, multiply every sample by
a factor less than 1. Multiplying by 0.5 will reduce the volume by
6dB.

```cpp
void gain(array<double>& ioSample)
{
    // zero outputs
    for (uint i=0; i < audioOutputsCount; i++)
    {
        ioSample[i] *= 0.5;
    }
}
```

## Example 03 - Invert Phase

To invert phase, multiply every sample by -1.

```cpp
void invert(array<double>& ioSample)
{
    // zero outputs
    for (uint i=0; i < audioOutputsCount; i++)
    {
        ioSample[i] *= -1;
    }
}
```